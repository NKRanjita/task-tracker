import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const styles = {
    container: {
      textAlign: 'center',
      padding: '40px',
      maxWidth: '600px',
      margin: '0 auto',
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '30px',
      color: '#333',
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginBottom: '30px',
    },
    button: {
      padding: '10px 16px',
      borderRadius: '6px',
      border: 'none',
      fontWeight: 'bold',
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    logoutButton: {
      backgroundColor: '#e74c3c',
      color: '#fff',
      padding: '10px 16px',
      borderRadius: '6px',
      border: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        Welcome, {user?.username} ({user?.role})
      </h2>

      <div style={styles.buttonGroup}>
        {user?.role === 'Developer' && (
          <>
            <Link to="/create"><button style={styles.button}>Create Task</button></Link>
            <Link to="/tasks"><button style={styles.button}>View My Tasks</button></Link>
          </>
        )}

        {user?.role === 'Manager' && (
          <>
            <Link to="/tasks"><button style={styles.button}>View All Tasks</button></Link>
          </>
        )}
      </div>

      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
