import React from 'react';
import styles from './forumthread.module.css';
import defaultAvatar from '../assets/noicon.png';

const ForumThread = ({ title, username, avatar }) => {
  return (
    <div className={styles.threadContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.userInfo}>
        <img
          src={avatar || defaultAvatar}
          alt="User avatar"
          className={styles.avatar}
        />
        <span className={styles.username}>{username}</span>
      </div>
    </div>
  );
};

export default ForumThread;
