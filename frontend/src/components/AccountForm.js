import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../css/AccountForm.scss';

const AccountForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  // const handleLogin = () => {
  //   if (username === 'user' && password === 'pass') {
  //     setLoginMessage('Login successful!');
  //     login();
  //     navigate('/menu');
  //   } else {
  //     setLoginMessage('Login failed. Invalid username or password.');
  //   }
  // }
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: username,
          password: password,
        }),
      });
  
      if (response.ok) {
        // ログイン成功の場合
        const data = await response.json();
        setLoginMessage(data.message);
        login();
        navigate('/menu');
      } else {
        // ログイン失敗の場合
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
          Username<br />
          <input
            type="text"
            value={username}
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
        <p>{loginMessage}</p>
      </form>
    </div>
  );
}

export default AccountForm;
