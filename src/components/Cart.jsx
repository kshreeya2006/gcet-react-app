import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Cart.css';

export default function Cart() {
  const { cart, setCart, products, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    calculateOrderValue();
  }, [cart]);

  const calculateOrderValue = () => {
    const total = products.reduce((sum, item) => {
      return sum + item.price * (cart[item.pid] || 0);
    }, 0);
    setOrderValue(total);
  };

  const increment = (id) => {
    const updatedCart = { ...cart, [id]: (cart[id] || 0) + 1 };
    setCart(updatedCart);
  };

  const decrement = (id) => {
    const updatedCart = { ...cart, [id]: Math.max(0, (cart[id] || 0) - 1) };
    setCart(updatedCart);
  };

  const placeOrder = async () => {
    try {
      await axios.post(`${API}/orders/new`, {
        email: user.email,
        orderValue: orderValue,
      });
      setCart({});
      navigate("/order");
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  const loginToOrder = () => navigate("/login");

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {products &&
        products.map(
          (item) =>
            cart[item.pid] > 0 && (
              <div key={item.pid}>
                <b>{item.name}</b> - ₹{item.price} &nbsp;
                <button onClick={() => decrement(item.pid)}>-</button>
                {cart[item.pid]}
                <button onClick={() => increment(item.pid)}>+</button>
                &nbsp; = ₹{item.price * cart[item.pid]}
              </div>
            )
        )}
      <hr />
      <h3>Total Order Value: ₹{orderValue}</h3>
      <hr />
      {user?.name ? (
        <button onClick={placeOrder}>Place Order</button>
      ) : (
        <button onClick={loginToOrder}>Login to Order</button>
      )}
    </div>
  );
}
