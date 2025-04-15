import React, { useEffect, useState } from "react";
import styles from "./styles/artworksCollection.module.css";

const ArtworksCollection = ({ userId }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState({});

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        if (!userId) {
          setLoading(false);
          return;
        }
        
        const response = await fetch(`http://localhost:5000/api/drawings/${userId}`);
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(`Expected JSON response but got ${contentType}`);
        }
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setArtworks(data);
      } catch (error) {
        console.error("Failed to fetch drawings:", error);
        setError("Failed to load drawings. Please try again later.");
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [userId]);

  const handleTitleChange = (drawingId, newTitle) => {
    setArtworks(prevArtworks => 
      prevArtworks.map(art => 
        art._id === drawingId ? { ...art, title: newTitle } : art
      )
    );
  };
  
  const updateDrawingTitle = async (drawingId, newTitle) => {
    if (!newTitle.trim()) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/drawings/${drawingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update drawing title');
      }
    } catch (error) {
      console.error('Error updating drawing title:', error);
    }
  };

  const handleDownload = async (artwork) => {
    try {
      setDownloadStatus(prev => ({ ...prev, [artwork._id]: 'loading' }));
      
      // Get the full image URL from the filepath
      const imageUrl = `http://localhost:5000${artwork.filepath}`;
      
      // Fetch the image file
      const response = await fetch(imageUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to download image (${response.status})`);
      }
      
      // Convert the response to a blob
      const blob = await response.blob();
      
      // Extract extension from filename or filepath
      let extension = 'png'; // Default extension
      if (artwork.filename) {
        const parts = artwork.filename.split('.');
        if (parts.length > 1) {
          extension = parts[parts.length - 1];
        }
      }
      
      // Create a download link and trigger download
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${artwork.title || 'Untitled'}.${extension}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      setDownloadStatus(prev => ({ ...prev, [artwork._id]: 'success' }));
      
      // Reset status after a delay
      setTimeout(() => {
        setDownloadStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[artwork._id];
          return newStatus;
        });
      }, 2000);
      
    } catch (error) {
      console.error("Failed to download drawing:", error);
      setDownloadStatus(prev => ({ ...prev, [artwork._id]: 'error' }));
      
      // Reset error status after delay
      setTimeout(() => {
        setDownloadStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[artwork._id];
          return newStatus;
        });
      }, 3000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Title</span>
        <span>Created</span>
        <span>Actions</span>
      </div>
      <div className={styles.scrollArea}>
        {loading ? (
          <div className={styles.message}>Loading...</div>
        ) : error ? (
          <div className={styles.message}>{error}</div>
        ) : artworks.length === 0 ? (
          <div className={styles.message}>No drawings yet...</div>
        ) : (
          artworks.map((artwork) => (
            <div key={artwork._id} className={styles.row}>
              <input
                type="text"
                defaultValue={artwork.title || "Untitled drawing"}
                className={styles.input}
                disabled
                onChange={(e) => handleTitleChange(artwork._id, e.target.value)}
                onBlur={(e) => updateDrawingTitle(artwork._id, e.target.value)}
              />
              <span className={styles.date}>
                {new Date(artwork.createdAt).toLocaleDateString()}
              </span>
              <div className={styles.actions}>
                <button 
                  className={styles.downloadBtn}
                  onClick={() => handleDownload(artwork)}
                  disabled={downloadStatus[artwork._id] === 'loading'}
                >
                  {downloadStatus[artwork._id] === 'loading' ? 'Downloading...' : 
                   downloadStatus[artwork._id] === 'success' ? 'Downloaded!' : 
                   downloadStatus[artwork._id] === 'error' ? 'Failed' : 'Download'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArtworksCollection;