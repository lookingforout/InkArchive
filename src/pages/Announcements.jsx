import React from "react";
import Sidebar from "../components/sidebar";
import SearchBar from "../components/searchbar";
import ProfileBar from "../components/profilebar";
import CreateThreadButton from "../components/createthreadbtn";
import styles from "../styles/Announcements.module.css";

const Announcements = () => {
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
          <ProfileBar username={null} profilePic={null} />
        </div>
        <div className={styles.forumContent}>
          <div className={styles.titleContainer}>
            <div className={styles.sectionTitle}>Announcements</div>
            <CreateThreadButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;