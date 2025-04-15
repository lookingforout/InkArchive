import React, {useState, useEffect} from "react";
import ArtDeskSidebar from "../components/artdesksidebar";
import SearchBar from "../components/searchbar";
import ProfileBar from "../components/profilebar";
import CreateArtworkButton from "../components/newartbtn";
import ArtworksCollection from "../components/artworkscollection";
import styles from "../styles/ArtDesk.module.css";

const ArtDesk = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
    
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const isGuest = user && user.role === 'guest';

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={styles.artDeskContainer}>
        <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <ArtDeskSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.topBar}>
          <button className={styles.menuButton} onClick={toggleSidebar}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18"></path>
            </svg>
          </button>
          <SearchBar onSearch={handleSearch} />
          <ProfileBar 
            username={user ? user.username : null} 
            profilePic={user ? user.profilePicture : null} 
            isGuest={isGuest} 
          />
        </div>
        <div className={styles.titleRow}>
          <h2 className={styles.artworksTitle}>My Artworks</h2>
          <CreateArtworkButton />
        </div>
        
        {isGuest ? (
          <div className={styles.guestMessage}>
            Guest users cannot save drawings. Please register for an account to save your artwork.
          </div>
        ) : (
          <ArtworksCollection userId={user ? user._id : null} />
        )}
      </div>
    </div>
  );
};

export default ArtDesk;