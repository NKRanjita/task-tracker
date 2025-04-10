// LogoutButton.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const LogoutButton = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return <button onClick={handleLogout} style={{ float: 'right', margin: '10px' }}>🚪 Logout</button>;
};

export default LogoutButton;
