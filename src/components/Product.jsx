import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
export default function Product() {
  const { user } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const API= import.meta.env.VITE_API_URL;
  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`);
    console.log("API URL:", `${API}/products`); 
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h3>Welcome {user.name}! </h3>
      <h2>Product List</h2>
      {products.map(product => (
          <li key={product.id} style={{ margin: "10px 0" }}>
            <strong>{product.name}</strong>: ${product.price}
          </li>
        ))}
    </div>
  );
}