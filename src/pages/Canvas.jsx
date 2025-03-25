import React from 'react';
import ToolSidebar from '../components/toolsidebar';
import ColorSidebar from '../components/colorsidebar';
import TopToolbar from '../components/tooltopbar';
import styles from '../styles/Canvas.module.css';

function Canvas() {
  return (
    <div className={styles.canvasContainer}>
      <ToolSidebar />
      <div className={styles.canvasArea}>
        <TopToolbar />
        <div className={styles.canvasContent}>
          {/* Your actual drawing canvas or editor will go here */}
        </div>
      </div>
      <ColorSidebar />
    </div>
  );
}

export default Canvas;
