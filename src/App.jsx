import { useState, createContext } from 'react';
import './App.css';
import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export const UserContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{ users, setUsers, currentUser, setCurrentUser }}>
      <BrowserRouter>
        <header>
          <h1>Ecommerce Shop</h1>
          <Link to="/">Home</Link> -
          <Link to="/cart">Cart</Link> -
          <Link to="/login">Login</Link>
          <hr />
        </header>

        <main>
          <Routes>
            <Route index element={<Product />} />
            <Route path="/" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <footer>
          <hr />
          &copy; 2005. All rights Reserved.
        </footer>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
