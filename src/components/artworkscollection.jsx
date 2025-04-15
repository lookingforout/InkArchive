import React, { useEffect, useState } from "react";
import styles from "./styles/artworksCollection.module.css";

const ArtworksCollection = ({ userId }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        if (!userId) {
          setLoading(false);
          return;
        }
        
        // Make sure URL is correct and also check for response type
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
    // Store the new title temporarily (not sending to server until blur)
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
      
      // Update was successful, no need to do anything else since state is already updated
    } catch (error) {
      console.error('Error updating drawing title:', error);
      // Optionally revert back to the original title
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Title</span>
        <span>Created</span>
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArtworksCollection;