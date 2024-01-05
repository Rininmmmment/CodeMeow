import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Make from './pages/Make';
import Register from './pages/Register';
import CodeList from './pages/CodeList';
import Promotion from './pages/Promotion';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* これはエラーになる: <Route path="/menu" element={<PrivateRoute element={<Menu />} />} /> */}
          <Route path="/menu"
            element={
              <PrivateRoute>
                <Menu />
              </PrivateRoute>
            }
          />
          <Route path="/make/upload"
            element={
              <PrivateRoute>
                <Make />
              </PrivateRoute>
            }
          />
          <Route path="/code-list"
            element={
              <PrivateRoute>
                <CodeList />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Promotion />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};


export default App;
