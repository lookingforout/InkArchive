import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ZoomIn, 
  ZoomOut, 
  File, 
  Edit 
} from 'lucide-react';
import ProfileBar from '../components/profilebar';
import styles from './tooltopbar.module.css';

const TopToolbar = () => {
  const [fileDropdown, setFileDropdown] = useState(false);
  const [editDropdown, setEditDropdown] = useState(false);
  const [canvasZoom, setCanvasZoom] = useState(80);
  const [history, setHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleFileDropdown = () => {
    setFileDropdown(!fileDropdown);
    setEditDropdown(false);
  };

  const toggleEditDropdown = () => {
    setEditDropdown(!editDropdown);
    setFileDropdown(false);
  };

  const handleNewDrawing = () => {
    console.log('New Drawing');
    setFileDropdown(false);
  };

  const handleOpenFile = () => {
    console.log('Open File');
    setFileDropdown(false);
  };

  const handleExportFile = () => {
    console.log('Export File');
    setFileDropdown(false);
  };

  const handleCanvasSize = () => {
    console.log('Change Canvas Size');
    setEditDropdown(false);
  };

  const handleFlipCanvas = () => {
    // Implement canvas flip logic
    console.log('Flip Canvas');
    setEditDropdown(false);
  };

  const handleFullCanvasView = () => {
    console.log('Full Canvas View');
    setEditDropdown(false);
  };

  const handleUndo = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
    }
  };

  const handleRedo = () => {
    if (currentHistoryIndex < history.length - 1) {
      setCurrentHistoryIndex(currentHistoryIndex + 1);
    }
  };

  const handleZoomIn = () => {
    setCanvasZoom(Math.min(canvasZoom + 10, 200));
  };

  const handleZoomOut = () => {
    setCanvasZoom(Math.max(canvasZoom - 10, 20));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'z') {
        handleUndo();
      }
      if (e.ctrlKey && e.key === 'y') {
        handleRedo();
      }
      if (e.ctrlKey && e.key === '+') {
        handleZoomIn();
      }
      if (e.ctrlKey && e.key === '-') {
        handleZoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentHistoryIndex, canvasZoom]);

  return (
    <div className={styles.topToolbar}>
      <div className={styles.toolbarLeft}>
        <div className={styles.dropdownContainer}>
          <button onClick={toggleFileDropdown} className={styles.dropdownButton}>
            <File size={20} />
            <span>File</span>
          </button>
          {fileDropdown && (
            <div className={styles.dropdown}>
              <button onClick={handleNewDrawing}>New Drawing</button>
              <button onClick={handleOpenFile}>Open File</button>
              <button onClick={handleExportFile}>Export File</button>
            </div>
          )}
        </div>

        <div className={styles.dropdownContainer}>
          <button onClick={toggleEditDropdown} className={styles.dropdownButton}>
            <Edit size={20} />
            <span>Edit</span>
          </button>
          {editDropdown && (
            <div className={styles.dropdown}>
              <button onClick={handleCanvasSize}>Change Canvas Size</button>
              <button onClick={handleFlipCanvas}>Flip</button>
              <button onClick={handleFullCanvasView}>Full View</button>
            </div>
          )}
        </div>

        <div className={styles.actionButtons}>
          <button onClick={handleUndo} className={styles.iconButton}>
            <ArrowLeft size={20} />
          </button>
          <button onClick={handleRedo} className={styles.iconButton}>
            <ArrowRight size={20} />
          </button>
        </div>

        <div className={styles.zoomButtons}>
          <button onClick={handleZoomOut} className={styles.iconButton}>
            <ZoomOut size={20} />
          </button>
          <button onClick={handleZoomIn} className={styles.iconButton}>
            <ZoomIn size={20} />
          </button>
        </div>
      </div>

      <div className={styles.profileBarContainer}>
        <ProfileBar username={user ? user.username : null} 
            profilePic={user ? user.profilePicture : null} 
            isGuest={user && user.role === 'guest'} />
      </div>
    </div>
  );
};

export default TopToolbar;