import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './createThreadBtn.module.css';

const CreateThreadButton = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isGuest = user && user.role === 'guest';

  const handleClick = () => {
    if (isGuest) {
      // For guests, show message that they need to register
      alert('You need to register for a full account to create threads.');
    } else {
      // For registered users, navigate to thread creation page
      navigate('/forum/createthread'); // Make sure this route exists
    }
  };

  return (
    <button
      className={styles.createThreadBtn}
      onClick={handleClick}
      title={isGuest ? "Register to create threads" : "Create new thread"}
    >
      Create Thread
    </button>
  );
};

export default CreateThreadButton;