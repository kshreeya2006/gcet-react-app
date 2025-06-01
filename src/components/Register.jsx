import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const { users, setUsers } = useContext(AppContext);
  const [user, setUser] = useState({});
  const Navigate = useNavigate();

  const handleSubmit = () => {
    setUsers([...users, user]);
    Navigate("/login");
  };

  return (
    <div className="register-container">
      <h3>Register</h3>
      <input
        className="register-input"
        type="text"
        placeholder="Name"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      /><br />
      <input
        className="register-input"
        type="text"
        placeholder="Email address"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      /><br />
      <input
        className="register-input"
        type="password"
        placeholder="New Password"
        onChange={(e) => setUser({ ...user, pass: e.target.value })}
      /><br />
      <button className="register-button" onClick={handleSubmit}>Submit</button>
      <hr />
      <ul className="register-list">
        {users && users.map((value, idx) => (
          <li key={idx}>{value.name} - {value.email} - {value.pass}</li>
        ))}
      </ul>
    </div>
  );
}
