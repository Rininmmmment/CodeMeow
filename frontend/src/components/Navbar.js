import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.scss';

const Navbar = () => {
  return (
    <nav>
      <a href="/menu" className="logo"><img src={process.env.PUBLIC_URL + '/images/logo_small.png'} className="logo" /></a>
      <a href="#" className='user'>Log out</a>
    </nav>
  );
};

export default Navbar;
