import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import SearchBar from "../components/searchbar";
import ProfileBar from "../components/profilebar";
import CreateThreadButton from "../components/createthreadbtn";
import styles from "../styles/Announcements.module.css";

const General = () => {
  const [user, setUser] = useState(null);

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

  return (
    <div className={styles.forumContainer}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.topBar}>
          <SearchBar onSearch={handleSearch} />
          <ProfileBar 
            username={user ? user.username : null} 
            profilePic={user ? user.profilePicture : null} 
            isGuest={user && user.role === 'guest'}
          />
        </div>
        <div className={styles.forumContent}>
        <div className={styles.titleContainer}> 
          <div className={styles.sectionTitle}>General & Off-topic</div>
          {(user && user.role === 'guest') ? "" : <CreateThreadButton/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;