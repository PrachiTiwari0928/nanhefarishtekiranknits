import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPayments = () => {
  const [orders, setOrders] = useState([]);

  const fetchPendingPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/pending-payments");
      setOrders(res.data);
    } catch (err) {
      alert("Error loading payments");
    }
  };

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const approvePayment = async (id) => {
    try {
      await axios.get(`http://localhost:5000/admin/approve-payment/${id}`);
      alert("Payment Approved ✅");
      fetchPendingPayments();
    } catch (err) {
      alert("Approve failed ❌");
    }
  };

  const rejectPayment = async (id) => {
    try {
      await axios.get(`http://localhost:5000/admin/reject-payment/${id}`);
      alert("Payment Rejected ❌");
      fetchPendingPayments();
    } catch (err) {
      alert("Reject failed ❌");
    }
  };

  return (
    <div style={container}>
      <h2 style={{ textAlign: "center" }}>Pending QR Payments</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No pending payments</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={card}>
            <p><b>Name:</b> {order.name}</p>
            <p><b>Address:</b> {order.address}</p>
            <p><b>Pincode:</b> {order.pincode}</p>
            <p><b>Payment:</b> {order.paymentMethod}</p>
            <p><b>Status:</b> {order.paymentStatus}</p>

            <div style={btnWrap}>
              <button
                style={approveBtn}
                onClick={() => approvePayment(order._id)}
              >
                Approve
              </button>

              <button
                style={rejectBtn}
                onClick={() => rejectPayment(order._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

/* ================= STYLES ================= */

const container = {
  maxWidth: "700px",
  margin: "30px auto",
  padding: "20px"
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  marginBottom: "20px"
};

const btnWrap = {
  display: "flex",
  gap: "10px",
  marginTop: "15px"
};

const approveBtn = {
  flex: 1,
  padding: "10px",
  border: "none",
  borderRadius: "10px",
  background: "green",
  color: "#fff",
  cursor: "pointer"
};

const rejectBtn = {
  flex: 1,
  padding: "10px",
  border: "none",
  borderRadius: "10px",
  background: "red",
  color: "#fff",
  cursor: "pointer"
};

export default AdminPayments;