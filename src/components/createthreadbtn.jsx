import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/createThreadBtn.module.css';

const CreateThreadButton = ({category}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/forum/createthread/${category}`);
  };

  return (
    <button className={styles.createThreadBtn} onClick={handleClick}>
      Create Thread
    </button>
  );
};

export default CreateThreadButton;