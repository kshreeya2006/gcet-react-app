import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import './Register.css';

export default function Register() {
  const { users, setUsers, setCurrentUser } = useContext(UserContext);
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = () => {
    if (users.some(u => u.email === user.email)) {
      alert('Email already registered');
      return;
    }
    setUsers([...users, user]);
    setCurrentUser(user);
    navigate('/');
  };

  return (
    <div className="register-container">
      <h3>Register</h3>
      <input
        className="register-input"
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      /><br />
      <input
        className="register-input"
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      /><br />
      <input
        className="register-input"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      /><br />
      <button className="register-button" onClick={handleRegister}>Submit</button>
    </div>
  );
}
