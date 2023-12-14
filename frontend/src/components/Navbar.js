import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.scss';

const Navbar = () => {
  return (
    <nav>
      <a href="/login" className="logo"><img src="images/logo_small.png" className="logo" /></a>
      {/* <a href="#"><img src="img/user.png" className="user" /></a> */}
    </nav>
  );
};

export default Navbar;
