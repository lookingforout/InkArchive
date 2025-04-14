import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/usersidebar';
import styles from '../styles/UserProfile.module.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('../src/assets/noicon.png');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const userObj = JSON.parse(userData);
    setUser(userObj);
    setProfilePhoto(userObj.profilePicture || '../src/assets/noicon.png');
  }, [navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setNewUsername('');
    setError('');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    // Dispatch storage event to update other components
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const handleSave = async () => {
    if (!newUsername.trim()) {
      setIsEditing(false);
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/update-username', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          username: newUsername,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update username');
      }
      
      // Update user in state and localStorage
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      setIsEditing(false);
      
      // Dispatch custom event to notify ProfileBar of user update
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePhotoChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Check file type and size
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!validImageTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
        setError('Image size should be less than 2MB');
        return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
        // Create form data to send file
        const formData = new FormData();
        formData.append('profilePicture', file);
        formData.append('userId', user._id);
        
        // Send file to backend
        const response = await fetch('http://localhost:5000/api/upload-profile-pic', {
            method: 'POST',
            body: formData,
            // Don't set Content-Type header, it will be set automatically with boundary
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to upload profile picture');
        }
        
        // Update user in state and localStorage
        setUser(data);
        setProfilePhoto(data.profilePicture);
        localStorage.setItem('user', JSON.stringify(data));
        
        // Dispatch custom event to notify ProfileBar of user update
        window.dispatchEvent(new Event('storage'));
        
    } catch (err) {
        setError(err.message || 'Failed to upload profile picture');
    } finally {
        setIsLoading(false);
    }
};

  const handleDeleteProfile = () => {
    setShowDeletePopup(true);
  };

  const confirmDeleteProfile = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`http://localhost:5000/api/delete-user/${user._id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete account');
      }
      

      localStorage.removeItem('user');
      navigate('/login');
    } catch (err) {
      setError(err.message);
      setShowDeletePopup(false);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelDeleteProfile = () => {
    setShowDeletePopup(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.forumContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <div className={styles.profileContainer}>
        <img
       src={profilePhoto.startsWith('/uploads') 
        ? `http://localhost:5000${profilePhoto}` 
        : profilePhoto}
    alt="Profile"
    className={styles.profilePhoto}
    onError={(e) => {
        e.target.onerror = null;
        e.target.src = "../src/assets/noicon.png";
    }}
          />
          
          {!isEditing ? (
            // Normal view
            <>
              <div className={styles.profileInfo}>
                <h2 className={styles.username}>{user.username}</h2>
              </div>
              <div className={styles.profileButtons}>
                <button 
                  className={styles.editButton} 
                  onClick={handleEditToggle}
                  disabled={isLoading}
                >
                  Edit Profile
                </button>
                <button 
                  className={styles.logoutButton} 
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </>
          ) : (
            // Edit mode
            <>
              <div className={styles.editMode}>
                <div className={styles.editModeButtons}>
                  <button 
                    className={`${styles.actionButton} ${styles.changeButton}`}
                    onClick={() => fileInputRef.current.click()}
                    disabled={isLoading}
                  >
                    Change icon
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleProfilePhotoChange}
                    style={{ display: 'none' }}
                    accept="image/jpeg,image/png,image/gif"
                  />
                  <button 
                    className={`${styles.actionButton} ${styles.changeButton}`}
                    disabled={isLoading}
                  >
                    Change name
                  </button>
                  <input
                    type="text"
                    placeholder="new name here"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className={styles.textInput}
                    disabled={isLoading}
                  />
                  <button 
                    className={`${styles.actionButton} ${styles.deleteButton}`} 
                    onClick={handleDeleteProfile}
                    disabled={isLoading}
                  >
                    Delete Profile
                  </button>
                  <button 
                    className={`${styles.actionButton} ${styles.saveButton}`} 
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Save'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {showDeletePopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popup}>
              <p>Are you sure you want to delete your profile?</p>
              <div className={styles.popupActions}>
                <button
                  className={styles.confirmButton}
                  onClick={confirmDeleteProfile}
                  disabled={isLoading}
                >
                  {isLoading ? 'Deleting...' : 'Yes'}
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={cancelDeleteProfile}
                  disabled={isLoading}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;