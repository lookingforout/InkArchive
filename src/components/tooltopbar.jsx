import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ZoomIn, 
  ZoomOut, 
  File, 
  Edit, 
  Download,
  Save  // Added Save icon
} from 'lucide-react';
import ProfileBar from '../components/profilebar';
import styles from './styles/tooltopbar.module.css';

const TopToolbar = ({ canvasRef }) => {
  const [fileDropdown, setFileDropdown] = useState(false);
  const [editDropdown, setEditDropdown] = useState(false);
  const [exportDropdown, setExportDropdown] = useState(false);
  const [canvasZoom, setCanvasZoom] = useState(80);
  const [history, setHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // State to track saving progress

  // Add refs for dropdowns to handle closing when clicking outside
  const fileDropdownRef = useRef(null);
  const editDropdownRef = useRef(null);
  const exportDropdownRef = useRef(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Add event listener to close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (fileDropdownRef.current && !fileDropdownRef.current.contains(event.target)) {
        setFileDropdown(false);
      }
      if (editDropdownRef.current && !editDropdownRef.current.contains(event.target)) {
        setEditDropdown(false);
      }
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target)) {
        setExportDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleFileDropdown = () => {
    setFileDropdown(!fileDropdown);
    setEditDropdown(false);
    setExportDropdown(false);
  };

  const toggleEditDropdown = () => {
    setEditDropdown(!editDropdown);
    setFileDropdown(false);
    setExportDropdown(false);
  };

  const toggleExportDropdown = () => {
    setExportDropdown(!exportDropdown);
    setFileDropdown(false);
    setEditDropdown(false);
  };

  const handleNewDrawing = () => {
    window.location.reload();
    setFileDropdown(false);
  };

  const handleExportFile = () => {
    setFileDropdown(false);
    toggleExportDropdown();
  };

  // Update the handleSaveImage function in tooltopbar.jsx

const handleSaveImage = async () => {
  if (!canvasRef || !canvasRef.current) {
    console.error('Canvas reference not available');
    return;
  }

  // Check if user is logged in
  if (!user || user.role === 'guest') {
    alert('Please log in to save your drawing');
    setFileDropdown(false);
    return;
  }

  try {
    setIsSaving(true);
    // Get the canvas element and convert to data URL
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    
    // Create a timestamp for the filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `drawing-${timestamp}.png`;
    
    // Convert data URL to blob
    const response = await fetch(dataURL);
    const blob = await response.blob();
    
    // Create form data
    const formData = new FormData();
    formData.append('image', blob, filename);
    formData.append('userId', user._id); // Using MongoDB ObjectId
    formData.append('title', `Drawing ${new Date().toLocaleString()}`);
    
    // Send the image to the server
    const saveResponse = await fetch('http://localhost:5000/api/drawings/save', {
      method: 'POST',
      body: formData,
    });
    
    if (!saveResponse.ok) {
      const errorData = await saveResponse.json();
      throw new Error(errorData.error || 'Failed to save drawing');
    }
    
    const result = await saveResponse.json();
    console.log('Drawing saved successfully:', result);
    alert('Drawing saved successfully!');
  } catch (error) {
    console.error('Error saving drawing:', error);
    alert(`Failed to save drawing: ${error.message}`);
  } finally {
    setIsSaving(false);
    setFileDropdown(false);
  }
};

  // Export functions for different file formats
  const exportAsImage = (format) => {
    if (!canvasRef || !canvasRef.current) {
      console.error('Canvas reference not available');
      return;
    }

    try {
      // Get the canvas element
      const canvas = canvasRef.current;
      
      // Determine mime type based on format
      const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;
      
      // Create a data URL of the canvas content
      let dataURL;
      if (format === 'jpg') {
        // JPEG requires a white background
        const context = canvas.getContext('2d');
        const compositeOperation = context.globalCompositeOperation;
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        
        // Create a new canvas with white background
        const newCanvas = document.createElement('canvas');
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;
        const newContext = newCanvas.getContext('2d');
        
        // Fill with white background
        newContext.fillStyle = '#FFFFFF';
        newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);
        
        // Draw the original canvas on top
        newContext.drawImage(canvas, 0, 0);
        
        dataURL = newCanvas.toDataURL('image/jpeg', 0.9);
      } else {
        dataURL = canvas.toDataURL(mimeType);
      }
      
      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = dataURL;
      downloadLink.download = `drawing.${format}`;
      
      // Trigger the download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      console.log(`Exported as ${format.toUpperCase()}`);
    } catch (error) {
      console.error(`Error exporting as ${format}:`, error);
    }
    
    setExportDropdown(false);
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
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSaveImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentHistoryIndex, canvasZoom, user]);

  return (
    <div className={styles.topToolbar}>
      <div className={styles.toolbarLeft}>
        <div className={styles.dropdownContainer} ref={fileDropdownRef}>
          <button onClick={toggleFileDropdown} className={styles.dropdownButton}>
            <File size={20} />
            <span>File</span>
          </button>
          {fileDropdown && (
            <div className={styles.dropdown}>
              <button onClick={handleNewDrawing}>New Drawing</button>
              <button onClick={handleSaveImage} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Drawing'}
              </button>
              <button onClick={handleExportFile}>Export File</button>
            </div>
          )}
        </div>

        <div className={styles.dropdownContainer} ref={editDropdownRef}>
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

        {/* Export dropdown */}
        {exportDropdown && (
          <div className={styles.dropdown} ref={exportDropdownRef} style={{ left: '150px' }}>
            <button onClick={() => exportAsImage('png')}>PNG</button>
            <button onClick={() => exportAsImage('jpg')}>JPG</button>
            <button onClick={() => exportAsImage('webp')}>WebP</button>
          </div>
        )}

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