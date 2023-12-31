import React, { useState } from 'react';
import AccountForm from '../components/LoginFrom.js';
import '../css/Login.scss';

const Login = () => {
  return (
    <div class="login-container">
      <div class="logo-container">
        <img src="../images/logo_big.png" />
      </div>
      <div class="form-container">
        <AccountForm />
      </div>
    </div>
  );
};

export default Login;
