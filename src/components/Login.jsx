import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../App';
import './Login.css';

export default function Login() {
  const { users, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
  <h3>Login</h3>
  <input
    className="login-input"
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  /><br />
  <input
    className="login-input"
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  /><br />
  <button className="login-button" onClick={handleLogin}>Login</button>
  <p className="login-p">
    Don't have an account?{' '}
    <Link className="login-link" to="/register">Create Account</Link>
  </p>
</div>

  );
}
