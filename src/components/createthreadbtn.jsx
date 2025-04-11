import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/createThreadBtn.module.css';

const CreateThreadButton = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleClick = () => {
    navigate('/forum/createthread');
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