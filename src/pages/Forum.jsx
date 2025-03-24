import React from "react";
import Sidebar from "../components/Sidebar";
import ForumCategory from "../components/forumcategory";
import SearchBar from "../components/searchbar";
import ProfileBar from "../components/profilebar";
import styles from "../styles/Forum.module.css";

const Forum = () => {
  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  return (
    <div className={styles.forumContainer}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.topBar}>
          <SearchBar onSearch={handleSearch} />
          <ProfileBar username="User" profilePic={null} />
        </div>
        <h2 className={styles.sectionTitle}>General & Site</h2>
        <div className={styles.forumContent}>
          <ForumCategory
            title="Announcements"
            description="Site updates, status, and announcements."
            posts={0}
            onClick={() => handleCategoryClick("/forum/announcements")}
          />
        </div>
        <div className={styles.forumContent}>
          <ForumCategory
            title="General & Off-Topic"
            description="Stuff that doesn't go anywhere else."
            posts={0}
            onClick={() => handleCategoryClick("/forum/general")}
          />
        </div>
        <h2 className={styles.sectionTitle}>Creative</h2>
        <div className={styles.forumContent}>
          <ForumCategory
            title="Creator’s Corner"
            description="For talking about art, writing, or anything creative"
            posts={0}
            onClick={() => handleCategoryClick("/forum/creatorcorner")}
          />
        </div>
        <div className={styles.forumContent}>
          <ForumCategory
            title="Art Discussion"
            description="Discuss and share as you make art"
            posts={0}
            onClick={() => handleCategoryClick("/forum/artdiscussion")}
          />
        </div>
        <div className={styles.forumContent}>
          <ForumCategory
            title="Art Trades"
            description="For your art for art swaps."
            posts={0}
            onClick={() => handleCategoryClick("/forum/arttrading")}
          />
        </div>
      </div>
    </div>
  );
};

export default Forum;
