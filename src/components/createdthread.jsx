import React from 'react';
import styles from './createdthread.module.css';
import defaultAvatar from '../src/assets/noicon.png';

const CreatedThread = ({ title, username, content, avatar }) => {
  return (
    <div className={styles.threadContainer}>
      <div className={styles.header}>
        <img
          src={avatar || defaultAvatar}
          alt="User Avatar"
          className={styles.avatar}
        />
        <div className={styles.threadInfo}>
          <h2 className={styles.threadTitle}>{title}</h2>
          <p className={styles.username}>by {username}</p>
        </div>
      </div>
      <div className={styles.contentBox}>
        <p className={styles.content}>{content}</p>
      </div>

      <div className={styles.commentDivider}>
        <hr className={styles.line} />
        <span className={styles.commentLabel}>Comments</span>
        <hr className={styles.line} />
      </div>
    </div>
  );
};

export default CreatedThread;