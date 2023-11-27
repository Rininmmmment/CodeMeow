import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import Make from './components/Make';
import Select from './components/Select';
import Chapter from './components/Chapter';
import Section from './components/Section';
import Result from './components/Result';

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
