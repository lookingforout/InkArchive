import React from 'react';
import ToolSidebar from '../components/toolsidebar';
import TopToolbar from '../components/tooltopbar';
import styles from '../styles/Canvas.module.css';

function Canvas() {
  return (
    <div className={styles.canvasContainer}>
      <TopToolbar />
      <ToolSidebar />
    </div>
  );
}

export default Canvas;