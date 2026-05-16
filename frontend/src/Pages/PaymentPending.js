import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from "../config";

const PaymentPending = () => {
  const navigate = useNavigate();
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    const orderId = localStorage.getItem("latestOrderId");

    if (!orderId) {
      navigate("/checkout");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${API_URL}/order-status/${orderId}`);

        if (res.data.paymentStatus === "approved") {
          clearInterval(interval);

          toast.success("Payment Successful ✅");

          setTimeout(() => {
            navigate("/order-success");
          }, 1500);
        }

        if (res.data.paymentStatus === "rejected") {
          clearInterval(interval);

          // reopen payment window on checkout
          localStorage.setItem("retryPayment", "true");

          toast.error("Payment not received ❌ Please try again");

          setTimeout(() => {
            navigate("/checkout");
          }, 1500);
        }
      } catch (err) {
        console.log("Status check error:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleNotifyAdmin = async () => {
    const orderId = localStorage.getItem("latestOrderId");
    if (!orderId) return;

    try {
      await axios.post(`${API_URL}/notify-admin/${orderId}`);
      setNotified(true);
      toast.success("Admin notified! Please wait for approval.");
    } catch (err) {
      toast.error("Failed to notify admin. Please try again.");
      console.log("Notify error:", err);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={heading}>Payment Under Verification ⏳</h2>
        <p style={text}>We are checking your payment.</p>
        <p style={text}>Please wait for admin approval.</p>
        {!notified && (
          <button onClick={handleNotifyAdmin} style={buttonStyle}>
            I Have Paid
          </button>
        )}
        {notified && <p style={text}>Admin has been notified. Waiting for approval...</p>}
      </div>
    </div>
  );
};

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "70vh",
};

const card = {
  background: "#fff",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  textAlign: "center",
  width: "420px",
};

const heading = {
  color: "#ff4f87",
  marginBottom: "15px",
};

const text = {
  color: "#555",
  fontSize: "16px",
  margin: "8px 0",
};

const buttonStyle = {
  background: "#ff4f87",
  color: "#fff",
  border: "none",
  padding: "12px 24px",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "20px",
};

export default PaymentPending;