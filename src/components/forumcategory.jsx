import React from "react";
import styles from "./styles/forumcategory.module.css";

const ForumCategory = ({ title, description, posts = 0, onClick }) => {
  return (
    <div className={styles.forumCategory} onClick={onClick}>
      <div className={styles.forumText}>
        <h2 className={styles.forumTitle}>{title}</h2>
        <p className={styles.forumDescription}>{description}</p>
      </div>
    </div>
  );
};

export default ForumCategory;
