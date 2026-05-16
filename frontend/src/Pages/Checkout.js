import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [payment, setPayment] = useState("cod");

  const [address, setAddress] = useState({
    full: "",
    pincode: "",
    alt: ""
  });

  const [timeLeft, setTimeLeft] = useState(120);

  // ================= USER CHECK =================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first 🔐");
      navigate("/login");
    }
  }, [navigate]);

  // ================= TIMER =================
  useEffect(() => {
    let timer;

    if (payment === "qr" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [payment, timeLeft]);

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // ================= ORDER SUBMIT =================
 const handleSubmit = async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));
  const product = JSON.parse(localStorage.getItem("buyProduct"));

  console.log("PRODUCT:", product);

  if (!user) {
    alert("Please login first 🔐");
    navigate("/login");
    return;
  }

  if (!product) {
    alert("No product found 🛑");
    return;
  }

  if (!address.full.trim() || !address.pincode.trim()) {
    alert("Please fill address & pincode 📍");
    return;
  }

  try {
    const res = await axios.post(`${API_URL}/place-order`, {
      userId: user._id,
      name: user.name,

      address: address.full,
      pincode: address.pincode,
      altAddress: address.alt,

      // ✅ FIXED
      productId: product.productId || "",
      productName: product.productName || "Product",
      productImage: product.productImage || "",
      productPrice: Number(product.productPrice) || 0,
      quantity: product.quantity || 1,

      paymentMethod: payment
    });

    localStorage.setItem("latestOrderId", res.data.order._id);

    clearCart();

    if (payment === "qr") {
      alert("Payment under verification ⏳");
      navigate("/payment-pending");
    } else {
      alert("Order Placed ✅");
      navigate("/order-success");
    }

  } catch (err) {
    console.log(err);
    alert("Order failed ❌");
  }
};

  return (
    <div style={container}>
      <h1 style={{ textAlign: "center" }}>Checkout</h1>

      {/* PAYMENT */}
      <div style={card}>
        <h3>Select Payment Method</h3>

        <label style={radio}>
          <input
            type="radio"
            value="cod"
            checked={payment === "cod"}
            onChange={(e) => setPayment(e.target.value)}
          />
          Cash on Delivery
        </label>

        <label style={radio}>
          <input
            type="radio"
            value="qr"
            checked={payment === "qr"}
            onChange={(e) => {
              setPayment(e.target.value);
              setTimeLeft(120);
            }}
          />
          Pay Online
        </label>
      </div>

      {/* ADDRESS */}
      <div style={card}>
        <h3>Delivery Address</h3>

        <input
          placeholder="Full Address *"
          value={address.full}
          onChange={(e) =>
            setAddress({ ...address, full: e.target.value })
          }
          style={input}
        />

        <input
          placeholder="Pincode *"
          value={address.pincode}
          onChange={(e) =>
            setAddress({ ...address, pincode: e.target.value })
          }
          style={input}
        />

        <input
          placeholder="Alternate Address (optional)"
          value={address.alt}
          onChange={(e) =>
            setAddress({ ...address, alt: e.target.value })
          }
          style={input}
        />
      </div>

      {/* QR PAYMENT */}
      {payment === "qr" && (
        <div style={card}>
          <h3>Scan & Pay</h3>

          <img
            src="/my-qr.png.png.jpeg"
            alt="QR"
            style={{
              width: "220px",
              display: "block",
              margin: "20px auto"
            }}
          />

          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            Pay within {formatTime()}
          </p>

          <button onClick={handleSubmit} style={btn}>
            I Have Paid
          </button>
        </div>
      )}

      {/* COD */}
      {payment !== "qr" && (
        <div style={bottomBar}>
          <button onClick={handleSubmit} style={btn}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;

/* ================= STYLES ================= */

const container = {
  padding: "20px",
  maxWidth: "600px",
  margin: "auto"
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  marginBottom: "20px"
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const radio = {
  display: "block",
  margin: "10px 0"
};

const bottomBar = {
  position: "sticky",
  bottom: "0",
  background: "#fff",
  padding: "15px",
  boxShadow: "0 -5px 15px rgba(0,0,0,0.1)"
};

const btn = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "25px",
  background: "#ff4f87",
  color: "white",
  fontWeight: "600",
  cursor: "pointer"
};