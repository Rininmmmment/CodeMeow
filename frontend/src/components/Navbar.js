import React, { useState } from 'react';
import '../css/Navbar.scss';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const [userId, setUserId] = useState(userInfo);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogout = async () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <a href="/menu" className="logo"><img src={process.env.PUBLIC_URL + '/images/logo_small.png'} className="logo" /></a>
      <a href="" className='logout' onClick={() => handleLogout(userId)}><i class="fa-solid fa-right-from-bracket"></i></a>
    </nav>
  );
};

export default Navbar;
