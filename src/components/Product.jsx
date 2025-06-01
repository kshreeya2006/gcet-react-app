import React, { useContext } from 'react';
import { UserContext } from '../App';
import './Product.css';

export default function Product() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="product-container">
      <h2>Product List</h2>
      {currentUser ? <p>Welcome, {currentUser.name}</p> : <p>Please login to shop.</p>}
    </div>
  );
}
