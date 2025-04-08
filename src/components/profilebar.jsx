import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./profilebar.module.css";

const ProfileBar = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    const handleStorageChange = () => {
      const updatedUserData = localStorage.getItem('user');
      if (updatedUserData) {
        setUser(JSON.parse(updatedUserData));
      } else {
        setUser(null);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  // If no user is logged in, show login/register links
  if (!user) {
    return (
      <div className={styles.profileBar}>
        <Link to="/login" className={styles.loginLink}>Login</Link>
        <Link to="/register" className={styles.registerLink}>Register</Link>
      </div>
    );
  }
  
  const profilePicUrl = user.profilePicture || "../src/assets/noicon.png";

  return (
    <Link to="/user" className={styles.profileLink}>
      <div className={styles.profileBar}>
        <img
          src={profilePicUrl.startsWith('/uploads') 
              ? `http://localhost:5000${profilePicUrl}` 
              : profilePicUrl}
          alt="Profile"
          className={styles.profilePic}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "../src/assets/noicon.png";
          }}
        />
        <span className={styles.username}>{user.username}</span>
      </div>
    </Link>
  );
};

export default ProfileBar;