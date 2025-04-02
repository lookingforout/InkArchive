import React from "react";
import { Link } from "react-router-dom";
import styles from "./profilebar.module.css";

const ProfileBar = ({ username, profilePic }) => {
  return (
    <Link to="/user" className={styles.profileLink}>
      <div className={styles.profileBar}>
        <img
          src={profilePic || "../src/assets/noicon.png"}
          alt="Profile"
          className={styles.profilePic}
        />
        <span className={styles.username}>{username || "Username"}</span>
      </div>
    </Link>
  );
};

export default ProfileBar;
