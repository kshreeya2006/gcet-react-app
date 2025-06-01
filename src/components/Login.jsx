import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { users, user, setUser } = useContext(AppContext);
  const [msg, setMsg] = useState();
  const Navigate = useNavigate();
  const handleSubmit = () => {
    const found = users.find(
      (value) => value.email === user.email && value.pass === user.pass
    );
    if (found) {
      setMsg("Welcome " + found.name);
      setUser({ ...user, name: found.name, token: "123" });
      Navigate("/");
    } else {
      setMsg("Invalid User or Password");
    }
  };

  const goToRegister = () => {
    Navigate("/register");
  };

  return (
    <div className="login-container">
      <h3>Login</h3>
      {msg && (
        <div className={msg.startsWith("Welcome") ? "login-msg-success" : "login-msg-error"}>
          {msg}
        </div>
      )}
      <input
        className="login-input"
        type="text"
        placeholder="Email address"
        value={user.email || ""}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      /><br />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={user.pass || ""}
        onChange={(e) => setUser({ ...user, pass: e.target.value })}
      /><br />
      <button className="login-button" onClick={handleSubmit}>Submit</button>
      <p>
        <button className="login-button-alt" onClick={goToRegister}>Create Account</button>
      </p>
    </div>
  );
}
