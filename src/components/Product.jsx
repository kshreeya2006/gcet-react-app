import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import './Product.css';

export default function Product() {
  const { user } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(""); 
  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products/all`);
      setProducts(res.data);
      setError(""); 
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      setProducts([]);
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
  <div className="product-container">
    <h3>Welcome {user.name}!</h3>
    <h2>Product List</h2>
    {error && <div className="error-message">{error}</div>}

    <div className="product-list">
      {products.map(product => (
        <div className="product-card" key={product.id}>
          <strong>{product.name}</strong>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  </div>
);


}
