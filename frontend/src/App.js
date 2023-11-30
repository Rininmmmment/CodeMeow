import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Make from './pages/Make';
import Select from './pages/Select';
import Chapter from './pages/Chapter';
import Section from './pages/Section';
import Result from './pages/Result';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/make" element={<Make />} />
          <Route path="/play/select" element={<Select />} />
          <Route path="/play/chapter" element={<Chapter />} />
          <Route path="/play/section" element={<Section />} />
          <Route path="/play/result" element={<Result />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
