import React, { useEffect, useState } from "react";
import styles from "./styles/artworksCollection.module.css";

const ArtworksCollection = ({ userId }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(`/api/artworks?userId=${userId}`);
        const data = await response.json();
        setArtworks(data);
      } catch (error) {
        console.error("Failed to fetch artworks:", error);
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchArtworks();
    }
  }, [userId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Name</span>
        <span>Created</span>
      </div>
      <div className={styles.scrollArea}>
        {loading ? (
          <div className={styles.message}>Loading...</div>
        ) : artworks.length === 0 ? (
          <div className={styles.message}>no artworks yet...</div>
        ) : (
          artworks.map((artwork, index) => (
            <div key={index} className={styles.row}>
              <input
                type="text"
                defaultValue={artwork.name || "Untitled drawing"}
                className={styles.input}
              />
              <span className={styles.date}>
                {new Date(artwork.createdAt).toLocaleDateString() || "xx/xx/xxxx"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArtworksCollection;
