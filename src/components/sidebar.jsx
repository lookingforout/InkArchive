import React from 'react';
import styles from './styles/sidebar.module.css';

const Sidebar = ({ isSidebarHidden, onToggle }) => {
  const handleToggle = () => {
    onToggle(!isSidebarHidden);
  };

  return (
    <div className={`${styles.sidebarContainer} ${isSidebarHidden ? styles.hidden : ''}`}>
      <div className={styles.iconSidebar}>
        <a href="/" className={styles.iconLink}>
          <div className={styles.logoCircle}>
            <img src="../../src/assets/logo.png" alt="Logo" className={styles.logoImage} />
          </div>
        </a>
        <a href="/forum" className={styles.iconLink}>
          <div className={styles.forumIconCircle}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
            </svg>
          </div>
        </a>
        <a href="/artdesk" className={styles.iconLink}>
          <div className={styles.artdeskIconCircle}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"></path>
            </svg>
          </div>
        </a>
      </div>

      <div className={styles.categorySidebar}>
        <div className={styles.categoryContainer}>
          <div className={styles.redHeader}>Art Forum</div>

          <div className={styles.sectionContainer}>
            <div className={`${styles.redHeader} ${styles.forumHeader}`}>
              <span>General & Site</span>
            </div>
            <div className={styles.subCategory}>Announcements</div>
            <div className={styles.subCategory}>General & Off-Topic</div>
          </div>

          <div className={styles.sectionContainer}>
            <div className={`${styles.redHeader} ${styles.forumHeader}`}>
              <span>Creative</span>
            </div>
            <div className={styles.subCategory}>Creator's Corner</div>
            <div className={styles.subCategory}>Art Discussion</div>
            <div className={styles.subCategory}>Art Trades</div>
          </div>
        </div>
      </div>
      <div className={`${styles.hideButton} ${isSidebarHidden ? styles.open : ''}`} onClick={handleToggle}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </div>
    </div>
  );
};

export default Sidebar;