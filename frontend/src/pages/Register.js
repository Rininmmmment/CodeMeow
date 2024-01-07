import React, { useState } from 'react';
import '../css/Register.scss';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const [userData, setUserData] = useState({
    user_name: '',
    email: '',
    password: '',
  });
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setRegistrationCompleted(true);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-container"> 
      {!registrationCompleted ? (
        <form className="form-container" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <label>
            User Name<br />
            <input
              type="text"
              name="user_name"
              value={userData.user_name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email<br />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Password<br />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Register</button>
          <a href="/login" className='login-link'>Log in if you have an account.</a>
        </form>
      ) : (
        <p className="completed-message">Registration completed! You can now log in.</p>
      )}
    </div>
  );
};

export default Register;
