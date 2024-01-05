import React from 'react';
import '../css/Promotion.scss';

const Promotion = () => {
  return (
    <div className="pr-container">
      <div className='top-container'>
        <div className='img-container'>
          <img src={process.env.PUBLIC_URL + '/images/logo_small.png'} className="logo" />
        </div>
        <div className='text-container'>
          <h1>Unleash the boundless potential of code<br/>with <span className='pink'>Code meow</span> <span className='blue'>Universe</span> !</h1>
          <p>
          Collect your favorite code snippets and complete coding tasks faster and more efficiently.
          </p>
          <a href="/register" className='start-btn'>Get Started!</a>
        </div>
      </div>
      <div className='middle-container'>

      </div>
      <div className='bottom-container'>
        
      </div>
    </div>
  );
};

export default Promotion;