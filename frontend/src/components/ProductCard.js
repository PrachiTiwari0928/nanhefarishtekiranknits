import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Product added to cart 🛒");
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "22px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        textAlign: "center",
        transition: "0.3s",
        width: "100%",
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.transform = "translateY(-8px)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.transform = "translateY(0)")
      }
    >
      {/* IMAGE */}
      <div
        style={{
          overflow: "hidden",
          borderRadius: "16px",
          marginBottom: "12px",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "210px",
            objectFit: "cover",
          }}
        />
      </div>

      {/* NAME */}
      <h3
        style={{
          margin: "10px 0 6px",
          color: "#333",
          fontSize: "17px",
          fontWeight: "600",
        }}
      >
        {product.name}
      </h3>

      {/* PRICE */}
      <p
        style={{
          color: "#d63384",
          fontWeight: "700",
          fontSize: "16px",
          marginBottom: "6px",
        }}
      >
        ₹{product.price}
      </p>

      {/* AGE */}
      {product.age && (
        <p
          style={{
            fontSize: "13px",
            color: "#777",
            marginBottom: "10px",
          }}
        >
          Age: {product.age}
        </p>
      )}

      {/* ADD TO CART */}
      <button
        onClick={handleAddToCart}
        style={{
          marginTop: "8px",
          padding: "10px",
          border: "none",
          borderRadius: "18px",
          background: "linear-gradient(135deg, #ff4f87, #ff85a2)",
          color: "#fff",
          cursor: "pointer",
          width: "100%",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        Add to Cart
      </button>

      {/* VIEW DETAILS */}
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <button
          style={{
            marginTop: "8px",
            padding: "9px",
            borderRadius: "18px",
            border: "1px solid #ff85a2",
            background: "#fff",
            color: "#ff4f87",
            cursor: "pointer",
            width: "100%",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;