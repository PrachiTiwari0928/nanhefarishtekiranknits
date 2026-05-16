import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    fetchOrders(user._id);
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/my-orders/${userId}`
      );

      console.log("ORDERS DATA:", res.data);
      setOrders(res.data);
    } catch (err) {
      console.log("Error fetching orders", err);
    }
  };

  return (
    <div style={container}>
      <h2 style={heading}>🧾 My Orders</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={card}>

            {/* STATUS */}
            <div style={topRow}>
              <h3 style={{ margin: 0 }}>
                {order.orderStatus === "confirmed"
                  ? "Order Approved 🎉"
                  : "Processing ⏳"}
              </h3>

              <span style={badge(order.paymentStatus)}>
                {order.paymentStatus}
              </span>
            </div>

            {/* PRODUCT SECTION (FIXED STRUCTURE) */}
            <div style={productBox}>

              {order.productImage ? (
                <img
                  src={order.productImage}
                  alt="product"
                  style={img}
                />
              ) : (
                <div style={noImg}>No Image</div>
              )}

              <div>
                <h4 style={{ margin: "5px 0" }}>
                  {order.productName}
                </h4>

                <p style={{ margin: 0, fontWeight: "bold" }}>
                  ₹{order.productPrice}
                </p>

                <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
                  Qty: {order.quantity}
                </p>
              </div>

            </div>

            {/* ADDRESS */}
            <div style={{ marginTop: "10px" }}>
              <p><b>Order ID:</b> {order._id}</p>
              <p><b>Name:</b> {order.name}</p>
              <p><b>Address:</b> {order.address}</p>
              <p><b>Pincode:</b> {order.pincode}</p>
              <p><b>Payment:</b> {order.paymentMethod}</p>
            </div>

            {/* BUTTON */}
            {order.orderStatus === "confirmed" && (
              <button
                style={btn}
                onClick={() => navigate("/order-success")}
              >
                View Order
              </button>
            )}

          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;

/* ================= STYLES ================= */

const container = {
  maxWidth: "800px",
  margin: "40px auto",
  padding: "20px"
};

const heading = {
  textAlign: "center",
  color: "#ff4f87"
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  marginBottom: "20px"
};

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const badge = (status) => ({
  padding: "5px 10px",
  borderRadius: "20px",
  background: status === "approved" ? "#d4f8d4" : "#fff3cd",
  color: status === "approved" ? "green" : "orange",
  fontSize: "12px",
  fontWeight: "bold"
});

const productBox = {
  display: "flex",
  gap: "15px",
  alignItems: "center",
  marginTop: "15px",
  padding: "10px",
  borderRadius: "10px",
  background: "#f9f9f9"
};

const img = {
  width: "90px",
  height: "90px",
  objectFit: "cover",
  borderRadius: "10px"
};

const noImg = {
  width: "90px",
  height: "90px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#ddd",
  borderRadius: "10px",
  fontSize: "12px"
};

const btn = {
  marginTop: "15px",
  padding: "10px 15px",
  border: "none",
  borderRadius: "20px",
  background: "#ff4f87",
  color: "white",
  cursor: "pointer",
  fontWeight: "600"
};