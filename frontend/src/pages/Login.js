import React, { useState } from 'react';
import AccountForm from '../components/AccountForm.js';
import '../css/Login.scss';

const Login = () => {
  return (
    <div class="login-container">
      <div class="logo-container">
        <img src="../img/logo_big.png" />
      </div>
      <div class="form-container">
        <AccountForm />
      </div>
    </div>
  );
};

export default Login;
