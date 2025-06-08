import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "./Product.css";

export default function Product() {
  const { user, products, setProducts, cart, setCart } = useContext(AppContext);
  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const token = user?.token || localStorage.getItem("token");
      const res = await axios.get(`${API}/products/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (id) => {
    if (!cart[id]) {
      setCart({ ...cart, [id]: 1 });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-container">
      <h3>Welcome {user?.name || "Guest"}!</h3>
      <h4>Product List</h4>
      {products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <strong>{product.name}</strong>
              <p>₹{product.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product._id)}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="error-message">No products available.</p>
      )}
    </div>
  );
}
