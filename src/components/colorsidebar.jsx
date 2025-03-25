import React from 'react';
import styles from './colorsidebar.module.css';
import ColorWheel from './colorwheel';

const ColorSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ColorWheel />
    </div>
  );
};

export default ColorSidebar;
