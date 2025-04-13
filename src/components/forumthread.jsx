import React, { useEffect, useState } from 'react';
import styles from './styles/forumthread.module.css';
import defaultAvatar from '../assets/noicon.png';
import { useNavigate } from 'react-router-dom';

const ForumThread = ({ id, title, owner }) => {
  const navigate = useNavigate();
  const [threadOwner, setThreadOwner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        if (owner && typeof owner === 'object' && owner.username) {
          setThreadOwner(owner);
          setLoading(false);
          return;
        }

        const ownerId = typeof owner === 'string' ? owner : null;
        if (!ownerId) {
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:5000/api/user/${ownerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const userData = await response.json();
        setThreadOwner(userData);
      } catch (error) {
        console.error("Error fetching thread owner:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwner();
  }, [owner]);

  const handleOpenThread = () => {
    navigate(`/forum/general/${id}`);
  };

  return (
    <div className={styles.threadContainer} onClick={handleOpenThread}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.userInfo}>
        {loading ? (
          <div>Loading user info...</div>
        ) : threadOwner ? (
          <img
            src={threadOwner.profilePicture && threadOwner.profilePicture.startsWith('/uploads') 
              ? `http://localhost:5000${threadOwner.profilePicture}` 
              : (threadOwner.profilePicture || defaultAvatar)}
            alt="User avatar"
            className={styles.avatar}
          />
        ) : (
          <img src={defaultAvatar} alt="User avatar" className={styles.avatar} />
        )}
      </div>
    </div>
  );
};

export default ForumThread;
