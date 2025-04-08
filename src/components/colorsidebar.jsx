import React, { useState } from 'react';
import styles from './colorsidebar.module.css';
import ColorWheel from './colorwheel';
import Layers from './layers';

const ColorSidebar = ({ 
  brushSize, 
  setBrushSize, 
  brushOpacity, 
  setBrushOpacity, 
  selectedColor, 
  setSelectedColor,
  layers,
  selectedLayerId,
  setLayers,
  setSelectedLayerId
}) => {
  return (
    <div className={styles.sidebar}>
      <ColorWheel 
        onColorChange={setSelectedColor}
        initialColor={selectedColor}
      />
      
      <div className={styles.brushSettings}>
        <div className={styles.setting}>
          <label>Size:</label>
          <input
            type="range"
            min="1"
            max="100"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
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
            onChange={(e) => setBrushOpacity(parseInt(e.target.value))}
          />
          <span>{brushOpacity}%</span>
        </div>
      </div>
      
      <Layers 
        layers={layers}
        setLayers={setLayers}
        selectedLayerId={selectedLayerId}
        setSelectedLayerId={setSelectedLayerId}
      />
    </div>
  );
};

export default ColorSidebar;