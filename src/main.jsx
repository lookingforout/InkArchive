import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import MainPage from './pages/MainPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Canvas from './pages/Canvas.jsx';
import Forum from './pages/Forum.jsx';
import Announcements from './pages/Announcements.jsx';
import General from './pages/General.jsx';
import CreatorCorner from './pages/CreatorCorner.jsx';
import ArtDiscussion from './pages/ArtDiscussion.jsx';
import ArtTrading from './pages/ArtTrading.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/canvas" element={<Canvas/>}></Route>
        <Route path="/forum" element={<Forum/>}></Route>
        <Route path="/forum/announcements" element={<Announcements/>}></Route>
        <Route path="/forum/general" element={<General/>}></Route>
        <Route path="/forum/creatorcorner" element={<CreatorCorner/>}></Route>
        <Route path="/forum/artdiscussion" element={<ArtDiscussion/>}></Route>
        <Route path="/forum/arttrading" element={<ArtTrading/>}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
)
