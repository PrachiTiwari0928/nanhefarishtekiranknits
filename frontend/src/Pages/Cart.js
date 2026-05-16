import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const navigate = useNavigate();

  // ✅ CORRECT TOTAL
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <h2>Your cart is empty 😢</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "20px",
                background: "#fff",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
              />

              {/* DETAILS */}
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: "8px" }}>{item.name}</h3>
                <p style={{ color: "#d63384", fontWeight: "600" }}>
                  ₹{item.price}
                </p>
              </div>

              {/* QUANTITY */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button onClick={() => decreaseQty(item.id)} style={btn}>
                  -
                </button>

                <span style={{ fontSize: "18px", fontWeight: "600" }}>
                  {item.qty}
                </span>

                <button onClick={() => increaseQty(item.id)} style={btn}>
                  +
                </button>
              </div>

              {/* PRICE */}
              <div style={{ fontWeight: "600" }}>
                ₹{item.price * item.qty}
              </div>

              {/* REMOVE */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#ff4f87",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* TOTAL */}
          <div
            style={{
              marginTop: "40px",
              padding: "25px",
              borderRadius: "20px",
              background: "#fff",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h2>Total: ₹{totalPrice}</h2>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                marginTop: "20px",
                padding: "14px 40px",
                border: "none",
                borderRadius: "25px",
                background: "linear-gradient(135deg, #ff4f87, #ff85a2)",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const btn = {
  padding: "6px 14px",
  borderRadius: "10px",
  border: "none",
  background: "#ff85a2",
  color: "#fff",
  cursor: "pointer",
};

export default Cart;