import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import ForumCategory from "../components/forumcategory";
import SearchBar from "../components/searchbar";
import ProfileBar from "../components/profilebar";
import styles from "../styles/Forum.module.css";

const Forum = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.forumContainer}>
      <div className={styles.sidebar}>
        <Sidebar isSidebarHidden={isSidebarHidden} onToggle={setIsSidebarHidden} />
      </div>
      <div className={`${styles.mainContent} ${isSidebarHidden ? styles.sidebarHidden : ''}`}>
        <div className={styles.topBar}>
          <SearchBar onSearch={handleSearch} />
          <ProfileBar
            username={user ? user.username : null}
            profilePic={user ? user.profilePicture : null}
            isGuest={user && user.role === 'guest'}
          />
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
