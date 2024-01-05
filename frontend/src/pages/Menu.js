import React, { useEffect, useState } from 'react';
import '../css/Menu.scss';
import Navbar from '../components/Navbar.js';

const Menu = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [updateInfos, setUpdateInfos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/updates`);
        const data = await response.json();
        setUpdateInfos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="menu-container">
      <Navbar />
      <div className="centering-container">
        <div className="make-play-container">
          <a href="/make/upload" className="menu-btn make">MAKE QUIZZES</a>
          <a href="/code-list" className="menu-btn play">PLAY CODE</a>
        </div>
        <div className='update-infos-container'>
          <h2>Information</h2>
          {updateInfos.map(info => (
            <div key={info.id} className='info-container'>
              <h3>{info.title}</h3>
              <p className='date'>{info.created_at}</p>
              <p>{info.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
