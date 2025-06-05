import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";

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
    <div>
      <h3>Welcome {user.name}!</h3>
      <h2>Product List</h2>
      {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}
      {products.map(product => (
        <li key={product.id} style={{ margin: "10px 0" }}>
          <strong>{product.name}</strong>: ${product.price}
        </li>
      ))}
    </div>
  );
}
