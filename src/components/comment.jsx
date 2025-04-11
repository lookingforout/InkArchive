import React from 'react';
import styles from './styles/comment.module.css';
import defaultAvatar from '../assets/noicon.png';

const Comment = ({ username, text, avatar }) => {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.header}>
        <img
          src={avatar || defaultAvatar}
          alt="User avatar"
          className={styles.avatar}
        />
        <span className={styles.username}>{username}</span>
      </div>
      <div className={styles.textBox}>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Comment;
