import React from 'react';
import '../css/Menu.scss';
import Navbar from '../components/Navbar.js';

const Menu = () => {
  return (
    <div className="menu-container">
      <Navbar />
      <div className="centering-container">
        <div className="make-play-container">
          <a href="/make/upload" className="menu-btn make">MAKE QUIZZES</a>
          <a href="/code-list" className="menu-btn play">PLAY CODE</a>
        </div>
        {/* <a href="#" className="menu-btn settings">SETTINGS</a> */}
      </div>
    </div>
  );
};

export default Menu;