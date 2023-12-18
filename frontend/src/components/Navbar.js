import React, { useState } from 'react';
import '../css/Navbar.scss';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const [userId, setUserId] = useState(userInfo);
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <a href="/menu" className="logo"><img src={process.env.PUBLIC_URL + '/images/logo_small.png'} className="logo" /></a>
      <a href="" className='user' onClick={() => handleLogout(userId)}>Log out</a>
    </nav>
  );
};

export default Navbar;
