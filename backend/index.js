const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Свързването с базата данни (mongodb)
mongoose.connect('mongodb+srv://root:12345@inkarchive.jvvml7u.mongodb.net/', { dbName: 'Test'}) //това в къвичките ти е връзката към cluster-a нея я вземаш от сайта или приложението
.then(() => { console.log('Connected to database') })
.catch((err) => {console.log(err)});

//Схема на таблица, както в laravel
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
    date: {
        type: Date,
        default: Date.now,
    },
}); 

//Това ти е middleware които се прави с метода pre() в него пишеш какво да става преди изпълнението на функция като save (горе долу същото както във laravel)
/* Набързо ти копирах всички възможни опции които можеш да ползваш на мястото на save:
save - Runs before a document is saved
validate - Runs before validation
remove - Runs before a document is removed
deleteOne - Runs before a single document is deleted
deleteMany - Runs before multiple documents are deleted
updateOne - Runs before a single document update
updateMany - Runs before a multiple document update
findOneAndUpdate - Runs before findOneAndUpdate
findOneAndDelete - Runs before findOneAndDelete
findOneAndRemove - Runs before findOneAndRemove
insertMany - Runs before multiple documents are inserted

това също са и методи които можеш за ползваш където по надолу се ползват*/
UserSchema.pre('save', async function(next) {
    //Тука криптираме паролата само когато има промяна или за първи път я правим (ака това ще работи и когато user-a си сменя паролата) 
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        //Криптираме паролата        
        this.password = await bcrypt.hash(this.password, salt);
        next(); //next е като return казва че е готово и да продължи с това което първоначално е почнал (в случая да запази данните)
    } catch (error) {
        next(error);
    }
});

//Метод за сръвняване на криптираната парола с въведената при login
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
//Това създава таблицата заедно със middleware-a и метода
const User = mongoose.model('Users', UserSchema);
User.createIndexes();//създава индексите

// This is where shit begins
const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => { //това ако отидеш на localhost:5000 ще видиш "App is Working"
    resp.send("App is Working");
});
//всичко до дук са декларации

app.post("/register", async (req, resp) => { //това ти е както във laravel където казваш кое е post заявка и какво да прави на нея (как да я обработи)
    try {
        const user = new User(req.body); //User-а тука е това от линия 65 (декларацията на обекта) с което казваме че искаме да правим нещо с тази таблица като му даваме информацията от post заявката
        let result = await user.save(); //запазваме новия потребител като преди това минава през middleware-a горе
        //тука това просто показва какво сме запазили ако сме успели ако не ще даде грешката по долу
        result = result.toObject();
        if (result) {
            resp.status(201).json(result);
            console.log("User registered:", result);
        }
    } catch (e) {
        console.error("Registration error:", e);
        resp.status(400).json({ error: "Registration failed", message: e.message }); //Това е отговор на post заявката (става за error message-и както по долу)
    }
});

//това е същото като горе, но тука имаме 
app.post("/login", async (req, resp) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        //Предполагам че тука всичко е pretty self-explanatory
        if (!user) {
            return resp.status(401).json({ error: "No such email" });
        }
        
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
            return resp.status(401).json({ error: "Wrong password" });
        }
        
        // Връща профила на логналия се потребител
        const userObject = user.toObject();
        delete userObject.password;
        
        resp.status(200).json(userObject);
    } catch (e) {
        resp.status(500).json({ error: "Login failed", message: e.message });
    }
});

const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

app.put('/api/update-username', async (req, resp) => {
    try {
        const { userId, username } = req.body;
        
        const existingUser = await User.findOne({ username, _id: { $ne: userId } });
        if (existingUser) {
            return resp.status(400).json({ error: 'Username already taken' });
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username },
            { new: true }
        );
        
        if (!updatedUser) {
            return resp.status(404).json({ error: 'User not found' });
        }
        
        const userObject = updatedUser.toObject();
        delete userObject.password;
        
        resp.status(200).json(userObject);
    } catch (error) {
        console.error('Update username error:', error);
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
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture },
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