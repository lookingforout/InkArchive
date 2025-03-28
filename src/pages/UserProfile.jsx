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
    };
  
    const handleSave = () => {
      if (newUsername.trim()) {
        setUsername(newUsername);
      }
      setIsEditing(false);
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
            <div className={styles.profileHeader}>
              <img
                src={profilePhoto}
                alt="Profile Icon"
                className={styles.profilePhoto}
              />
              {!isEditing ? (
                <>
                  <h2 className={styles.username}>{username}</h2>
                  <button className={styles.editButton} onClick={handleEditToggle}>
                    Edit
                  </button>
                </>
              ) : (
                <div className={styles.editSection}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    className={styles.fileInput}
                  />
                  <input
                    type="text"
                    placeholder="New Username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className={styles.textInput}
                  />
                  <div className={styles.actionButtons}>
                    <button className={styles.saveButton} onClick={handleSave}>
                      Save
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={handleDeleteProfile}
                    >
                      Delete Profile
                    </button>
                    <button className={styles.cancelButton} onClick={handleEditToggle}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
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