import React from 'react';
import '../css/Menu.scss';
import Navbar from '../components/Navbar.js';

const Menu = () => {
  return (
    <div>
      <Navbar />
      <div class="menu-container">
        <div class="centering-container">
          <div class="make-play-container">
            <a href="#" class="menu-btn make">MAKE AND EDIT<br />QUIZ</a>
            <a href="#" class="menu-btn play">PLAY CODE</a>
          </div>
          <a href="#" class="menu-btn settings">SETTINGS</a>
        </div>
      </div>
    </div>
  );
};

export default Menu;