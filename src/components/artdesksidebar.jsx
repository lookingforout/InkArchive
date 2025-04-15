import React from 'react';
import styles from './styles/sidebar.module.css';

const ArtDeskSidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.sidebarContainer} ${isOpen ? styles.open : ''}`}>
      <div className={styles.iconSidebar}>
        <a href="/" className={styles.iconLink}>
          <div className={styles.logoCircle}>
            <img src="../src/assets/logo.png" alt="Logo" className={styles.logoImage} />
          </div>
        </a>
        <div className={styles.closeButton} onClick={onClose}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </div>
        
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
          <div className={styles.redHeader}>Art Desk</div>
          <div className={styles.sectionContainer}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtDeskSidebar;