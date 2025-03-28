import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './createThreadBtn.module.css';

const CreateThreadButton = () => {
  const navigate = useNavigate();

  const handleCreateThread = () => {
    navigate('/forum/createthread');
  };

  return (
    <button 
      onClick={handleCreateThread} 
      className={styles.createThreadBtn}
    >
      + Create Thread
    </button>
  );
};

export default CreateThreadButton;