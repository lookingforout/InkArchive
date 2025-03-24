import React, { useState } from "react";
import styles from "./searchbar.module.css";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.inputContainer}>
        <svg
          fill="#ffffff"
          width="20px"
          height="20px"
          viewBox="-2.5 -2.5 24 24"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMin"
          className={styles.icon}
        >
          <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm6.32-1.094l3.58 3.58a1 1 0 1 1-1.415 1.413l-3.58-3.58a8 8 0 1 1 1.414-1.414z" />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default SearchBar;
