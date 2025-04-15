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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={styles.forumContainer}>
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      </div>
      
      <div className={styles.mainContent}>
        <div className={styles.topBar}>
          <button className={styles.menuButton} onClick={toggleSidebar}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18"></path>
            </svg>
          </button>
          <SearchBar onSearch={handleSearch} />
          <ProfileBar username={user ? user.username : null} 
            profilePic={user ? user.profilePicture : null} 
            isGuest={user && user.role === 'guest'} />
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
            title="Creator's Corner"
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