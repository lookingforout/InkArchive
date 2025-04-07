import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Register.module.css';
import { ArrowLeft } from 'lucide-react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    console.log('Register attempt', { username, email, password });
    
    try {
      const response = await fetch( 
        'http://localhost:5000/register', {
          method: "post",
          body: JSON.stringify({ username, email, password }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
      const result = await response.json();
      console.log(result);
      
      if (response.status === 201) {
        console.log("Registration successful!");
        localStorage.setItem('user', JSON.stringify(result));
        
        navigate('/forum');
      } else {

        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Registration error:", error);
    }
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.backButton}>
        <Link to="/">
          <ArrowLeft color="white" size={24} />
        </Link>
      </div>
      <div className={styles.registerWrapper}>
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <img src="src/assets/logo.png" alt="Ink Archive Logo" />
          </div>
          <p className={styles.tagline}>Let your creativity flow</p>
        </div>
        <div className={styles.formSection}>
          <h2>Start drawing now</h2>
          <form onSubmit={handleRegister}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
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
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
            <button type="button" className={styles.guestButton}>
              Use a guest account instead
            </button>
            <button type="submit" className={styles.registerButton}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;