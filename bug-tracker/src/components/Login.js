import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Developer'); // 🔥 Default to Developer
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const users = [
    { username: 'Naik', password: 'abcd', role: 'Developer' },
    { username: 'Mang', password: 'abcd', role: 'Manager' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.username === username &&
        u.password === password &&
        u.role === role
    );

    if (user) {
      login(user);
      navigate(user.role === 'Manager' ? '/manager-dashboard' : '/dashboard');
    } else {
      alert('Invalid credentials or role');
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Welcome Back</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{...styles.input,  width:"107.5%",}}
          >
            <option value="Developer">Developer</option>
            <option value="Manager">Manager</option>
          </select>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #dbeafe, #ffffff)',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: '50px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontFamily: 'Segoe UI, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px 15px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
     marginLeft:"-2vh",
    fontFamily: 'Segoe UI, sans-serif',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'Segoe UI, sans-serif',
    marginLeft:".2vh"
  },
};

export default Login;
