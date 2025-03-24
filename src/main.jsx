import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Canvas from './pages/Canvas.jsx';
import Forum from './pages/Forum.jsx';
import Announcements from './pages/Announcements.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Routes are like the routes in Laravel where you say what element is called on what path aka the thing after the slash */}
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/canvas" element={<Canvas/>}></Route>
        <Route path="/forum" element={<Forum/>}></Route>
        <Route path="/forum/announcements" element={<Announcements/>}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
)
