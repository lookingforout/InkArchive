import React from "react";
import styles from "./forumcategory.module.css";

const ForumCategory = ({ title, description, posts = 0 }) => {
  return (
    <div className={styles.forumCategory}>
      <div className={styles.forumText}>
        <h2 className={styles.forumTitle}>{title}</h2>
        <p className={styles.forumDescription}>{description}</p>
      </div>
      <span className={styles.forumPosts}>{posts} posts</span>
    </div>
  );
};

export default ForumCategory;
