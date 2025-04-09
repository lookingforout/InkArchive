import React, { useRef } from 'react';
import styles from './postinput.module.css';
import { FaImage } from 'react-icons/fa';

const PostInput = ({ onSubmit }) => {
  const fileInputRef = useRef();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handlePost = () => {
    // logic to send post data will be implemented later
    onSubmit && onSubmit();
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.inputWrapper}>
        <textarea
          className={styles.textArea}
          placeholder="Write something..."
        />
        <div className={styles.imageIcon} onClick={handleImageClick}>
          <FaImage />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className={styles.hiddenInput}
          />
        </div>
      </div>
      <button className={styles.postButton} onClick={handlePost}>
        Post
      </button>
    </div>
  );
};

export default PostInput;
