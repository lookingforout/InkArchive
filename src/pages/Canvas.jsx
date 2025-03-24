import React from 'react';
import ToolSidebar from '../components/toolsidebar';
import styles from '../styles/Canvas.module.css';

function Canvas() {
  return (
    <div className={styles.canvasContainer}>
      <ToolSidebar />
    </div>
  );
}

export default Canvas;