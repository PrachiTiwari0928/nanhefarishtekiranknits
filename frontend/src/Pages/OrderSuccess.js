import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <h1 style={{ color: "green" }}>Your Order Has Been Approved ✅</h1>
      <p>Your payment was verified successfully.</p>
      <p>Your order has been placed successfully.</p>

      <button style={btn} onClick={() => navigate("/my-orders")}>
        View My Orders
      </button>
    </div>
  );
};

const container = {
  textAlign: "center",
  marginTop: "100px"
};

const btn = {
  marginTop: "20px",
  padding: "12px 24px",
  border: "none",
  borderRadius: "25px",
  background: "#ff4f87",
  color: "white",
  cursor: "pointer"
};

export default OrderSuccess;