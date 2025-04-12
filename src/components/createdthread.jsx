import React, { useEffect } from 'react';
import styles from './styles/createdthread.module.css';
import defaultPic from '../../src/assets/noicon.png';

const CreatedThread = ({ thread, owner }) => {
  useEffect(() => {
    console.log(thread);
    console.log(owner);
  },[])
 
  return (
    <div className={styles.threadContainer}>
      <div className={styles.header}>
        <img
          src={owner.profilePicture && owner.profilePicture.startsWith('/uploads') 
            ? `http://localhost:5000${owner.profilePicture}` 
            : defaultPic}
          alt="User Avatar"
          className={styles.avatar}
        />
        <div className={styles.threadInfo}>
          <h2 className={styles.threadTitle}>{thread.title}</h2>
          <p className={styles.username}>by {owner.username}</p>
        </div>
      </div>
      <div className={styles.contentBox}>
        <p className={styles.content}>{thread.content}</p>
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