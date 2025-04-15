import React, {useEffect, useState} from "react";
import Sidebar from "../components/sidebar";
import SearchBar from "../components/searchbar";
import ProfileBar from "../components/profilebar";
import CreateThreadButton from "../components/createthreadbtn";
import styles from "../styles/Announcements.module.css";
import ForumThread from "../components/forumthread";

const Announcements = () => {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    const handleThreads = async () =>{
      try {
        setLoading(true);
        const threads = await fetch("http://localhost:5000/forum/threads/announcements",{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })      
        const threading = await threads.json();
        setThreads(threading);
      }catch(error) {
        console.error("Error fetching threads:", error);
        setThreads([]);
      } finally {
        setLoading(false);
      }
    }
    handleThreads();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
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
          <ProfileBar 
            username={user ? user.username : null} 
            profilePic={user ? user.profilePicture : null} 
            isGuest={user && user.role === 'guest'} />
        </div>
        <div className={styles.forumContent}>
          <div className={styles.titleContainer}>
            <div className={styles.sectionTitle}>Announcements</div>
            {(user && user.role === 'admin') ? <CreateThreadButton category="announcements"/> : ""}
          </div>
          <div>
             {loading ? (
              <p className={styles.threadLoading}>Loading threads...</p>
            ) : threads.length > 0 ?
              threads.map((thread) => (
                <ForumThread id={thread._id} title={thread.title} ownerId={thread.owner} category="announcements"/>
              )) : <p className={styles.threadLoading}>No threads found!</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;