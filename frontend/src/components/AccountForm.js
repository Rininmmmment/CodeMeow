import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AccountForm.scss';

const AccountForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = () => {
    // Mock login logic
    if (username === 'user' && password === 'pass') {
      setLoginMessage('Login successful!');
      navigate('/menu');
    } else {
      setLoginMessage('Login failed. Invalid username or password.');
    }
  }

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
