import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/toolsidebar.module.css';
import logoImage from '../assets/logo.png';
import { Pencil, Brush, Eraser, Eye, PaintBucket, MousePointer, GripHorizontal, Type, Home } from 'lucide-react';

const ToolSidebar = ({ selectedTool, setSelectedTool }) => {
  const navigate = useNavigate();

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
            onClick={() => setSelectedTool(tool.name)}
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
      
      <div className={styles.bottomIcons} style={{ marginBottom: '20px' }}>
        <div
          className={styles.iconWrapper}
          onClick={() => navigate('/forum')}
          style={{ cursor: 'pointer' }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ACABAB" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
          </svg>
        </div>
        <div
          className={styles.iconWrapper}
          onClick={() => navigate('/artdesk')}
          style={{ cursor: 'pointer' }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ACABAB" strokeWidth="2">
            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ToolSidebar;
