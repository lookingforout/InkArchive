import React from "react";
import ArtDeskSidebar from "../components/artdesksidebar";
import SearchBar from "../components/searchbar";
import ProfileBar from "../components/profilebar";
import styles from "../styles/ArtDesk.module.css";

const ArtDesk = () => {
  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  return (
    <div className={styles.artDeskContainer}>
      <div className={styles.sidebar}>
        <ArtDeskSidebar />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.topBar}>
          <SearchBar onSearch={handleSearch} />
          <ProfileBar username={null} profilePic={null} />
        </div>
      </div>
    </div>
  );
};

export default ArtDesk;
