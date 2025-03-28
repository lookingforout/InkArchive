import React from "react";
import styles from "./profilebar.module.css";

const ProfileBar = ({ username, profilePic }) => {
  return (
    <div className={styles.profileBar}>
      <img
        src={profilePic || "../src/assets/noicon.png"}
        alt="Profile"
        className={styles.profilePic}
      />
      <span className={styles.username}>{username || "Username"}</span>
    </div>
  );
};

export default ProfileBar;
