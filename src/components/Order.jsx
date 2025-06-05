import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import './Order.css';


export default function Order() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AppContext);
  const API = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders/${user.email}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    if (user?.email) fetchOrders();
  }, [user]);

  return (
    <div className="order-container">
    <h3>My Orders</h3>
    <ol>
      {orders.length > 0 ? (
        orders.map((order) => (
          <li key={order._id}>
            {order.email} - ₹{order.orderValue}
          </li>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </ol>
  </div>
  );
}
