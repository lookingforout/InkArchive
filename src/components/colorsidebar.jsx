import React, { useState } from 'react';
import styles from './colorsidebar.module.css';
import ColorWheel from './colorwheel';
import Layers from './layers';

const ColorSidebar = () => {
  const [brushSize, setBrushSize] = useState(10);
  const [brushOpacity, setBrushOpacity] = useState(100);

  return (
    <div className={styles.sidebar}>
      <ColorWheel />
      <div className={styles.brushSettings}>
        <div className={styles.setting}>
          <label>Size:</label>
          <input
            type="range"
            min="1"
            max="100"
            value={brushSize}
            onChange={(e) => setBrushSize(e.target.value)}
          />
          <span>{brushSize}px</span>
        </div>
        <div className={styles.setting}>
          <label>Opacity:</label>
          <input
            type="range"
            min="1"
            max="100"
            value={brushOpacity}
            onChange={(e) => setBrushOpacity(e.target.value)}
          />
          <span>{brushOpacity}%</span>
        </div>
      </div>
      <Layers />
    </div>
  );
};

export default ColorSidebar;