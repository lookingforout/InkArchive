require('dotenv').config()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mongoConnectionString = process.env.MONGODB_CON;

console.log(mongoConnectionString);
mongoose.connect(mongoConnectionString, { dbName: 'Test'})
.then(() => { console.log('Connected to database') })
.catch((err) => {console.log(err)});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "../src/assets/noicon.png"
    },
    role: {
        type: String,
        enum: ['user', 'guest', 'admin'],
        default: 'user'
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const ThreadSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    content:{
        type: String,
        require: true,
    },
    image:{
        type: String,
    },
    owner:{
        type: String,
        require: true,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

// ThreadSchema.pre('save', async function(next) {
//     if(this.owner.role === 'guest') return next();
// })

const User = mongoose.model('Users', UserSchema);
User.createIndexes();

const Thread = mongoose.model('threads', ThreadSchema);
Thread.createIndexes();

const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => { 
    resp.send("App is Working");
});


app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();

        result = result.toObject();
        if (result) {
            resp.status(201).json(result);
            console.log("User registered:", result);
        }
    } catch (e) {
        console.error("Registration error:", e);
        resp.status(400).json({ error: "Registration failed", message: e.message });
    }
});

app.post("/login", async (req, resp) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return resp.status(401).json({ error: "No such email" });
        }
        
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
            return resp.status(401).json({ error: "Wrong password" });
        }
        
        // Returning user with role information
        const userObject = user.toObject();
        delete userObject.password;
        
        resp.status(200).json(userObject);
    } catch (e) {
        resp.status(500).json({ error: "Login failed", message: e.message });
    }
});

app.post("/guest-login", async (req, resp) => {
    try {
        // Generate a random guest username
        const guestUsername = `Guest_${Math.floor(Math.random() * 10000)}`;
        
        // Create a temporary guest user object (not saved to database)
        const guestUser = {
            _id: `guest_${Date.now()}`, // Temporary ID
            username: guestUsername,
            email: `${guestUsername.toLowerCase()}@guest.inkarchive.com`,
            profilePicture: "../src/assets/noicon.png",
            role: 'guest',
            date: new Date()
        };
        
        resp.status(200).json(guestUser);
    } catch (e) {
        resp.status(500).json({ error: "Guest login failed", message: e.message });
    }
});

app.post("/forum/general/new_thread", async (req, resp) => {
    try{
        const thread = Thread(req.body);
        let result = await thread.save();

        result = result.toObject();
        if (result) {
            resp.status(201).json(result);
            console.log("Thread Made:", result);
        }
    }catch(e){
        resp.status(500).json({err: "Failed to create thread!"})
    }
})

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { log } = require('console');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed'));
    }
});

app.use('/uploads', express.static('uploads'));

app.post('/api/upload-profile-pic', upload.single('profilePicture'), async (req, resp) => {
    try {
        if (!req.file) {
            return resp.status(400).json({ error: 'No file uploaded' });
        }
        
        const { userId } = req.body;
        const profilePicturePath = `/uploads/${req.file.filename}`;
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: profilePicturePath },
            { new: true }
        );
        
        if (!updatedUser) {
            return resp.status(404).json({ error: 'User not found' });
        }
        
        const userObject = updatedUser.toObject();
        delete userObject.password;
        
        resp.status(200).json(userObject);
    } catch (error) {
        console.error('Upload profile picture error:', error);
        resp.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/upload-profile-pic', upload.single('profilePicture'), async (req, resp) => {
    try {
        if (!req.file) {
            return resp.status(400).json({ error: 'No file uploaded' });
        }
        
        const { userId } = req.body;
        const profilePicturePath = `/uploads/${req.file.filename}`;
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: profilePicturePath },
            { new: true }
        );
        
        if (!updatedUser) {
            return resp.status(404).json({ error: 'User not found' });
        }
        
        const userObject = updatedUser.toObject();
        delete userObject.password;
        
        resp.status(200).json(userObject);
    } catch (error) {
        console.error('Upload profile picture error:', error);
        resp.status(500).json({ error: 'Server error' });
    }
});

app.put('/api/update-profile-picture', async (req, resp) => {
    try {
        const { userId, profilePicture } = req.body;
        
        if (!profilePicture) {
            return resp.status(400).json({ error: 'No image provided' });
        }
        
        // Validate that it's a base64 image
        if (!profilePicture.startsWith('data:image/')) {
            return resp.status(400).json({ error: 'Invalid image format' });
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture },  // This will store the base64 string directly
            { new: true }
        );
        
        if (!updatedUser) {
            return resp.status(404).json({ error: 'User not found' });
        }
        
        const userObject = updatedUser.toObject();
        delete userObject.password;
        
        resp.status(200).json(userObject);
    } catch (error) {
        console.error('Update profile picture error:', error);
        resp.status(500).json({ error: 'Server error' });
    }
});

app.delete('/api/delete-user/:userId', async (req, resp) => {
    try {
        const { userId } = req.params;
        
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return resp.status(404).json({ error: 'User not found' });
        }
        
        resp.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        resp.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/user/:userId', async (req, resp) => {
    try {
        const { userId } = req.params;
        
        const user = await User.findById(userId);
        
        if (!user) {
            return resp.status(404).json({ error: 'User not found' });
        }
        
        const userObject = user.toObject();
        delete userObject.password;
        
        resp.status(200).json(userObject);
    } catch (error) {
        console.error('Get user error:', error);
        resp.status(500).json({ error: 'Server error' });
    }
});

app.listen(5000); //Това е последното нещо което се run-ва давайки старт на всичко това (сървъра).
console.log("App listen at port 5000");