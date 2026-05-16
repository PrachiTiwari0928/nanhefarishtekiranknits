import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product Not Found</h2>;
  }

  // ================= ADD TO CART =================
  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart 🛒");
  };

  // ================= BUY NOW =================
 const handleBuyNow = () => {
    const buyProduct = {
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      productPrice: product.price,
      quantity: 1
    };

    localStorage.setItem("buyProduct", JSON.stringify(buyProduct));

    console.log("BUY PRODUCT SAVED:", buyProduct);

    navigate("/checkout");
  };

  return (
    <div style={container}>
      <div style={card}>
        {/* IMAGE */}
        <div style={{ flex: 1 }}>
          <img src={product.image} alt={product.name} style={img} />
        </div>

        {/* DETAILS */}
        <div style={{ flex: 1 }}>
          <h1 style={{ color: "#d63384" }}>{product.name}</h1>

          <p style={price}>₹{product.price}</p>

          <p>Age: {product.age || "Not specified"}</p>

          <p style={{ color: "#555" }}>
            Beautiful handmade product 💖
          </p>

          {/* BUTTONS */}
          <button onClick={handleAddToCart} style={btn}>
            Add to Cart 🛒
          </button>

          <button onClick={handleBuyNow} style={btn2}>
            Buy Now ⚡
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

/* ================= STYLES ================= */

const container = {
  padding: "60px 20px",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #fff1f8, #f0fbff)"
};

const card = {
  maxWidth: "1100px",
  margin: "auto",
  display: "flex",
  gap: "50px",
  flexWrap: "wrap",
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
  alignItems: "center"
};

const img = {
  width: "100%",
  borderRadius: "15px"
};

const price = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#ff4f87"
};

const btn = {
  marginTop: "20px",
  padding: "12px 22px",
  border: "none",
  borderRadius: "25px",
  background: "#ff4f87",
  color: "white",
  cursor: "pointer",
  marginRight: "10px"
};

const btn2 = {
  marginTop: "20px",
  padding: "12px 22px",
  border: "none",
  borderRadius: "25px",
  background: "#28a745",
  color: "white",
  cursor: "pointer"
};