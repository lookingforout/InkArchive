import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import SearchBar from "../components/searchbar";
import ProfileBar from "../components/profilebar";
import styles from "../styles/CreateThread.module.css";

const CreateThread = () => {
  const navigate = useNavigate();
  const [threadTitle, setThreadTitle] = useState("");
  const [threadContent, setThreadContent] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState(null);
  const pathname = useLocation().pathname.split("/");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData))
    }
  },[])

  const handlePostThread = async () => {
    const category = pathname[pathname.length-1];

    console.log(category[0]);
    
    try {
      const response = await fetch(`http://localhost:5000/forum/new_thread`, {
        method: 'POST',
        body: JSON.stringify({ title: threadTitle, content: threadContent, image, category, owner: user._id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      console.log(result);
    
      console.log("Thread Posted:", result);
      
      navigate(`/forum/${category}`);
    }catch(err) {
        console.error("Thread creation error:", err);
    };
  }
  const handleAddImage = () => {
    console.log("Add Image button clicked");
  };

  return (
    <div className={styles.createThreadContainer}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.topBar}>
          <SearchBar onSearch={(query) => console.log("Search query:", query)} />
          <ProfileBar username={user ? user.username : null} 
            profilePic={user ? user.profilePicture : null} 
            isGuest={user && user.role === 'guest'} />        </div>
        <h1 className={styles.header}>Create Thread</h1>
        <input
          type="text"
          className={styles.threadTitleInput}
          placeholder="Thread Title"
          value={threadTitle}
          onChange={(e) => setThreadTitle(e.target.value)}
        />
        <div className={styles.threadContentWrapper}>
          <textarea
            className={styles.threadContentInput}
            placeholder="Write your thread content here..."
            value={threadContent}
            onChange={(e) => setThreadContent(e.target.value)}
          ></textarea>
          <button className={styles.addImageButton} onClick={handleAddImage}>
            <svg
              fill="#6b6868"
              width="30px"
              height="30px"
              viewBox="0 0 25 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M22,19 C22,20.6568542 20.6568542,22 19,22 L5,22 C3.34314575,22 2,20.6568542 2,19 L2,5 C2,3.34314575 3.34314575,2 5,2 L9.0005,2 C9.55250861,2 10,2.44749139 10,2.9995 C10,3.55154094 9.55254095,3.99908949 9.00050002,3.9991999 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,18.278 L8.18626653,12.4187618 C8.50017051,11.9792962 9.09949173,11.8737129 9.54124102,12.158983 L9.6401844,12.2317787 L14.785,16.518 L16.1679497,14.4452998 C16.4946552,13.9552416 17.1635825,13.8584909 17.6141119,14.2105599 L17.7071068,14.2928932 L20,16.585 L20,15 C20,14.4477153 20.4477153,14 21,14 C21.5522847,14 22,14.4477153 22,15 L22,19 Z M9.187,14.458 L5.228,20 L19,20 C19.4289102,20 19.794752,19.7299721 19.9367986,19.3506434 L17.155,16.57 L15.8320503,18.5547002 C15.5242948,19.0163334 14.9063415,19.1337563 14.4540306,18.8379569 L14.3598156,18.7682213 L9.187,14.458 Z M17,2 C17.5522847,2 18,2.44771525 18,3 L18,6 L21,6 C21.5522847,6 22,6.44771525 22,7 C22,7.55228475 21.5522847,8 21,8 L18,8 L18,11 C18,11.5522847 17.5522847,12 17,12 C16.4477153,12 16,11.5522847 16,11 L16,8 L13,8 C12.4477153,8 12,7.55228475 12,7 C12,6.44771525 12.4477153,6 13,6 L16,6 L16,3 C16,2.44771525 16.4477153,2 17,2 Z M8,6 C9.1045695,6 10,6.8954305 10,8 C10,9.1045695 9.1045695,10 8,10 C6.8954305,10 6,9.1045695 6,8 C6,6.8954305 6.8954305,6 8,6 Z"
              />
            </svg>
          </button>
        </div>
        <button className={styles.postButton} onClick={handlePostThread}>
          Post Thread
        </button>
      </div>
    </div>
  );
};

export default CreateThread;