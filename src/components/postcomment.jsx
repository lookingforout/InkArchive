import React, { useEffect, useRef, useState } from 'react';
import styles from '../components/styles/postcomment.module.css';
import { useLocation } from 'react-router-dom';

const PostInput = () => {
  const [user, setUser] = useState(null);
  const [content, setContent] = useState("");
  const pathname = useLocation().pathname.split("/");

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  
  useEffect(()=>{
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData))
    }
  },[]);

  const handlePost = async () => {
    const response = await fetch(`http://localhost:5000/forum/thread/create_comment`, {
      method: 'POST',
      body: JSON.stringify({ post: pathname[pathname-1], owner: user._id, content: fileInputRef }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    console.log(result);
  };
  

  return (
    <div className={styles.postContainer}>
      <div className={styles.inputWrapper}>
        <textarea
          className={styles.textArea}
          placeholder="Write something..."
          onChange={(e)=>{setContent(e.currentTarget.value)}}
        />
        <div className={styles.imageIcon} onClick={handleImageClick}>
          <input
            type="file"
            accept="image/*"
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
