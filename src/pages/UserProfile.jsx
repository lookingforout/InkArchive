import React, { useState } from 'react';
import Sidebar from '../components/usersidebar';
import styles from '../styles/UserProfile.module.css';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('Username');
  const [newUsername, setNewUsername] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('../src/assets/noicon.png');
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setNewUsername('');
  };

  const handleSave = () => {
    if (newUsername.trim()) {
      setUsername(newUsername);
    }
    setIsEditing(false);
    setNewUsername('');
  };

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  const handleDeleteProfile = () => {
    setShowDeletePopup(true);
  };

  const confirmDeleteProfile = () => {
    alert('Profile deleted!');
    setShowDeletePopup(false);
  };

  const cancelDeleteProfile = () => {
    setShowDeletePopup(false);
  };

  return (
    <div className={styles.forumContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        
        <div className={styles.profileContainer}>
          <img
            src={profilePhoto}
            alt="Profile"
            className={styles.profilePhoto}
          />
          
          {!isEditing ? (
            // Normal view
            <>
              <div className={styles.profileInfo}>
                <h2 className={styles.username}>{username}</h2>
              </div>
              <button 
                className={styles.editButton} 
                onClick={handleEditToggle}
              >
                Edit Profile
              </button>
            </>
          ) : (
            // Edit mode
            <>
              <div className={styles.editMode}>
                <div className={styles.editModeButtons}>
                  <button className={`${styles.actionButton} ${styles.changeButton}`}>
                    Change icon
                  </button>
                  <button className={`${styles.actionButton} ${styles.changeButton}`}>
                    Change name
                  </button>
                  <input
                    type="text"
                    placeholder="new name here"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className={styles.textInput}
                  />
                  <button 
                    className={`${styles.actionButton} ${styles.deleteButton}`} 
                    onClick={handleDeleteProfile}
                  >
                    Delete Profile
                  </button>
                  <button 
                    className={`${styles.actionButton} ${styles.saveButton}`} 
                    onClick={handleSave}
                  >
                    Save
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
                >
                  Yes
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={cancelDeleteProfile}
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