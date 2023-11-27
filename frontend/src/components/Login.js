import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // ユーザー名が 'user' かつ パスワードが 'password' の場合にログイン成功とする
    if (username === 'user' && password === 'password') {
      setLoggedIn(true);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
            <h2>Welcome, {username}!</h2>
            <a href="/menu">Menu</a>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
