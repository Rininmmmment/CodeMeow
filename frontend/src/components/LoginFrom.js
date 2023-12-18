import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../css/LoginForm.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  
  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        login(data.user_id);
        navigate('/menu');
      } else {
        const data = await response.json();
        setLoginMessage(`Login failed. ${data.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginMessage('An error occurred during login.');
    }
  };
  

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form>
        <label>
          Email<br />
          <input
            type="text"
            value={email}
            onChange={handleUsernameChange}
          />
        </label>
        <br />
        <label>
          Password<br />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Meow Meow
        </button>
        <a className='register-link' href="/register">Register if you do not have an account.</a>
        <p>{loginMessage}</p>
      </form>
    </div>
  );
}

export default LoginForm;
