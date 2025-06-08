import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useLocation } from "react-router-dom";
import axios from "axios";
import './Order.css';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AppContext);
  const location = useLocation();
  const API = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders/${user.email}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [location.state?.newOrder]);

  return (
    <div className="order-container">
      <h3>My Orders</h3>
      {orders.length > 0 ? (
        <ol>
          {orders.map((value) => (
            <li key={value._id}>
              {value.email} - ₹{value.orderValue}
            </li>
          ))}
        </ol>
      ) : (
        <p>You haven't placed any orders yet.</p>
      )}
    </div>
  );
}
