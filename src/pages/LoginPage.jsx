import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Login attempt', { email, password });
    
    try {
      const response = await fetch(
        'http://localhost:5000/login', {
          method: "post",
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
      const result = await response.json();
      
      if (response.ok) {
        console.log("Login successful:", result);
        
        localStorage.setItem('user', JSON.stringify(result));
        
        navigate('/forum');
      } else {
        setError(result.error || "Login failed. Please try again.");
        console.error("Login failed:", result);
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.backButton}>
        <Link to="/">
          <ArrowLeft color="white" size={24} />
        </Link>
      </div>
      <div className={styles.loginWrapper}>
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <img src="src/assets/logo.png" alt="Ink Archive Logo" />
          </div>
          <p className={styles.tagline}>Let your creativity flow</p>
        </div>
        <div className={styles.formSection}>
          <h2>Log in</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
            <button type="submit" className={styles.loginButton}>
              Log in
            </button>
          </form>
          <div className={styles.registerLink}>
            No account? <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;