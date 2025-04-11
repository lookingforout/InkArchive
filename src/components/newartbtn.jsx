import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/newartbtn.module.css';

const CreateArtworkButton = () => {
  const navigate = useNavigate();

  const handleCreateArt = () => {
    navigate('/canvas');
  };

  return (
    <button 
      onClick={handleCreateArt} 
      className={styles.createArtBtn}
    >
      + New Artwork
    </button>
  );
};

export default CreateArtworkButton;