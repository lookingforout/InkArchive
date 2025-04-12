import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/app.css'
import style from '../styles/MainPage.module.css';

const MainPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleStartDrawing = () => {
    navigate('/canvas');
  };

  useEffect(() => {
    // Check if user is logged in when component mounts
    const userData = localStorage.getItem('user');
    if (userData) {
      setIsLoggedIn(true);
    }

    const handleMouseMove = (event) => {
      const background = document.querySelector(`.${style.background}`);
      if (!background) return;

      const { clientX, clientY } = event;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const moveX = (clientX - centerX) * 0.02;
      const moveY = (clientY - centerY) * 0.02;

      background.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGuestLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/guest-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (response.status === 200) {
        console.log("Guest login successful!");
        localStorage.setItem('user', JSON.stringify(result));
        navigate('/canvas');
      } else {
        setError(result.message || "Guest login failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Guest login error:", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <div className={style.mainPage}>
      <div className={style.background}></div>

      <header className={style.navbar}>
        <div className={style.logoContainer}>
          <img src="src/assets/logo.png" alt="Logo" className={style.logo} />
          <span className={style.brandName}>Ink Archive</span>
        </div>
        <div className={style.navButtons}>
          {!isLoggedIn ? (
            <button className={style.loginButton} onClick={() => navigate('/login')}>Log In</button>
          ) : (
            <button className={style.loginButton} onClick={handleLogout}>Log Out</button>
          )}
          <button className={style.drawButton} onClick={isLoggedIn ? handleStartDrawing : handleGuestLogin}>Draw</button>
        </div>
      </header>

      <main className={style.content}>
        <div className={style.welcomeContainer}>
          <h1>Welcome to <br />Ink Archive</h1>
          <p>A free drawing platform where you can paint, <br />share your artwork, and connect with fellow <br />artists in the forum. Let your creativity flow!</p>
          <button className={style.startButton} onClick={isLoggedIn ? handleStartDrawing : handleGuestLogin}>Start Drawing</button>
        </div>
      </main>
    </div>
  );
};

export default MainPage;