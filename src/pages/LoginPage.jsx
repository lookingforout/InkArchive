import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login attempt', { email, password });
    try {
      let result = await fetch( //правим пост заявка с данните от формата (под формата на json)
        'http://localhost:5000/login', {
          method: "post",
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      result = await result.json(); //резултата или по скоро отговора който получаваме от backend сървъра
      setError(result.error); //нещо мъничко което направих да покажа как може да ползваш отговорите на заявката за показване на валидация
      console.log(result);
    } catch (error) {
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
            <p>{error}</p>  {/*  The shit that shows the errors */}
            <button type="button" className={styles.forgotPassword}>
              Forgot password
            </button>
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