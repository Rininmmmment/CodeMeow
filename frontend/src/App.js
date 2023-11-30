import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Make from './pages/Make';
import Select from './pages/Select';
import Chapter from './pages/Chapter';
import Section from './pages/Section';
import Result from './pages/Result';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/menu"
            element={
              <PrivateRoute>
                <Menu />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};


export default App;
