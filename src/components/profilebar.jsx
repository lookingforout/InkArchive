import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./profilebar.module.css";

const ProfileBar = ({ username, profilePic, isGuest }) => {
  const defaultPic = "../src/assets/noicon.png";
  return (
    <Link to={isGuest ? "/register" : "/user"} className={styles.profileLink}>
      <div className={styles.profileBar}>
        <img
          src={profilePic && profilePic.startsWith('/uploads') 
            ? `http://localhost:5000${profilePic}` 
            : defaultPic}
          alt="Profile"
          className={styles.profilePic}
        />
        <span className={styles.username}>{username}</span>
      </div>
    </Link>
  );
};

export default ProfileBar;