import React, { useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { user } = useContext(AppContext);

  return (
    <header>
      <h1>My Online Shop</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/order">Order</Link>
        <Link to="/cart">Cart</Link>
        {user?.token === "1" ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <hr />
    </header>
  );
}
