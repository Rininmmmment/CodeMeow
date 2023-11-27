import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import Make from './components/Make';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/make" element={<Make />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
