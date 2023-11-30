import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.scss';

const Navbar = () => {
  return (
    <nav>
      <a href="/menu" class="logo"><img src="img/logo_small.png" class="logo" /></a>
      {/* <a href="#"><img src="img/user.png" class="user" /></a> */}
    </nav>
  );
};

export default Navbar;
