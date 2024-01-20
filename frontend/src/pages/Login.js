import React, { useState } from 'react';
import LoginForm from '../components/LoginFrom.js';
import '../css/Login.scss';

const Login = () => {
  return (
    <div class="login-container">
      <div class="logo-container">
        <img src="../images/logo_big.png" />
      </div>
      <div class="form-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
