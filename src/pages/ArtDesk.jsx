import React, {useState, useEffect} from "react";
import ArtDeskSidebar from "../components/artdesksidebar";
import SearchBar from "../components/searchbar";
import ProfileBar from "../components/profilebar";
import CreateArtworkButton from "../components/newartbtn";
import ArtworksCollection from "../components/artworkscollection";
import styles from "../styles/ArtDesk.module.css";

const ArtDesk = () => {
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

  // Check if user is a guest
  const isGuest = user && user.role === 'guest';

  return (
    <div className={styles.artDeskContainer}>
      <div className={styles.sidebar}>
        <ArtDeskSidebar />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.topBar}>
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