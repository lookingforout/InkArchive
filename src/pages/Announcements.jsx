import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import SearchBar from "../components/searchbar";
import ProfileBar from "../components/profilebar";
import CreateThreadButton from "../components/createthreadbtn";
import ForumThread from "../components/forumthread";
import styles from "../styles/Announcements.module.css";

const Announcements = () => {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    const fetchThreads = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/forum/general/threads", {
          method: 'POST',
          body: JSON.stringify({ category: "announcements" }),
          headers: {
            'Content-Type': 'application/json'
          }
        });      
        const data = await response.json();
        console.log(data);
        setThreads(data);
      } catch(error) {
        console.error("Error fetching threads:", error);
        setThreads([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchThreads();
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
            isGuest={user && user.role === 'guest'} />
        </div>
        <div className={styles.forumContent}>
          <div className={styles.titleContainer}>
            <div className={styles.sectionTitle}>Announcements</div>
            {(user && user.role === 'admin') ? <CreateThreadButton category="announcements" /> : ""}
          </div>
          <div>
            {loading ? (
              <p className={styles.threadLoading}>Loading threads...</p>
            ) : threads.length > 0 ?
              threads.map((thread) => (
                <ForumThread key={thread._id} id={thread._id} title={thread.title} owner={thread.owner} />
              )) : <p className={styles.threadLoading}>No threads found!</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;