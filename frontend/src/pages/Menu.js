import React from 'react';
import '../css/Menu.scss';
import Navbar from '../components/Navbar.js';

const Menu = () => {
  return (
    <div>
      <Navbar />
      <div className="menu-container">
        <div className="centering-container">
          <div className="make-play-container">
            <a href="/make-quizzes/upload" className="menu-btn make">MAKE AND EDIT<br />QUIZ</a>
            <a href="#" className="menu-btn play">PLAY CODE</a>
          </div>
          <a href="#" className="menu-btn settings">SETTINGS</a>
        </div>
      </div>
    </div>
  );
};

export default Menu;