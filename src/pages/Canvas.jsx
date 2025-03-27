import React, { useState } from 'react';
import ToolSidebar from '../components/toolsidebar';
import ColorSidebar from '../components/colorsidebar';
import TopToolbar from '../components/tooltopbar';
import DrawingCanvas from '../components/drawingcanvas';
import styles from '../styles/Canvas.module.css';

function Canvas() {
  const [selectedTool, setSelectedTool] = useState(null);

  return (
    <div className={styles.canvasContainer}>
      <ToolSidebar 
        selectedTool={selectedTool} 
        setSelectedTool={setSelectedTool} 
      />
      <div className={styles.canvasArea}>
        <TopToolbar />
        <div className={styles.canvasContent}>
          <DrawingCanvas selectedTool={selectedTool} />
        </div>
      </div>
      <ColorSidebar />
    </div>
  );
}

export default Canvas;
