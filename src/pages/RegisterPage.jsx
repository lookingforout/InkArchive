import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Register.module.css';
import { ArrowLeft } from 'lucide-react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    console.log('Register attempt', { username, email, password });
  };

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