import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const API = import.meta.env.VITE_API_URL;

export default function Register() {
  const { setUser } = useContext(AppContext);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API}/users/register`, newUser);
      setMsg("Registered successfully!");
      setUser(res.data);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      setMsg("Error: Could not register. Try again.");
    }
  };

  const isError = msg.toLowerCase().includes("error") || msg.toLowerCase().includes("fail");

  return (
    <div className="register-container">
      <h3>Register</h3>
      {msg && (
        <p className={isError ? "register-msg-error" : "register-msg-success"}>
          {msg}
        </p>
      )}
      <p>
        <input
          className="register-input"
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
      </p>
      <p>
        <input
          className="register-input"
          type="email"
          placeholder="Email address"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
      </p>
      <p>
        <input
          className="register-input"
          type="password"
          placeholder="New Password"
          value={newUser.password}
          onChange={(e) =>
            setNewUser({ ...newUser, password: e.target.value })
          }
        />
      </p>
      <button className="register-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
