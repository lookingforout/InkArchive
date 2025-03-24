import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './toolsidebar.module.css';
import logoImage from '../assets/logo.png';

import { 
  Pencil, 
  Brush, 
  Eraser, 
  Eye,
  PaintBucket, 
  MousePointer, 
  GripHorizontal,
  Type, 
  Home, 
  MessageCircle, 
  LayoutGrid 
} from 'lucide-react';

const ToolSidebar = () => {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState(null);

  const tools = [
    { icon: Home, name: 'home' },
    { icon: Pencil, name: 'pencil', texture: true },
    { icon: Brush, name: 'brush', texture: true },
    { icon: Eraser, name: 'eraser' },
    { icon: Eye, name: 'eyedrop' },
    { icon: PaintBucket, name: 'bucket' },
    { icon: MousePointer, name: 'select' },
    { icon: GripHorizontal, name: 'hand-move' },
    { icon: Type, name: 'text' }
  ];

  const handleToolSelect = (toolName) => {
    setSelectedTool(toolName);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer} onClick={handleLogoClick}>
        <img 
          src={logoImage} 
          alt="InkArchive" 
          className={styles.logo}
        />
      </div>
      
      <div className={styles.toolContainer}>
        {tools.slice(1).map((tool) => (
          <div 
            key={tool.name} 
            className={`${styles.toolWrapper} ${selectedTool === tool.name ? styles.selected : ''}`}
            onClick={() => handleToolSelect(tool.name)}
          >
            {tool.icon && React.createElement(tool.icon, {
              color: "#acabab", 
              size: 24,
              className: tool.texture ? styles[`${tool.name}Texture`] : ''
            })}
            {selectedTool === tool.name && <div className={styles.selectedIndicator}></div>}
          </div>
        ))}
      </div>
      
      <div className={styles.bottomIcons}>
        <div className={styles.iconWrapper}>
          <MessageCircle color="#acabab" size={24} />
        </div>
        <div className={styles.iconWrapper}>
          <LayoutGrid color="#acabab" size={24} />
        </div>
      </div>
    </div>
  );
};

export default ToolSidebar;