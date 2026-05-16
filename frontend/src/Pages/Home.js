import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroImage from "../images/hero.jpg";

import ProductCard from "../components/ProductCard";

import img1 from "../assets/1.jpeg";
import img2 from "../assets/2.jpeg";
import img3 from "../assets/3.jpeg";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const featuredProducts = [
    {
      id: 1,
      name: "Yellow Baby Set",
      price: 999,
      image: img1,
      category: "Suit",
      age: "0-6 months",
    },
    {
      id: 2,
      name: "Blue Baby Set",
      price: 999,
      image: img2,
      category: "Suit",
      age: "0-6 months",
    },
    {
      id: 3,
      name: "Pink Baby Set",
      price: 999,
      image: img3,
      category: "Suit",
      age: "0-6 months",
    },
  ];

  // 🔥 SKELETON UI
  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        {/* HERO SKELETON */}
        <div
          style={{
            height: "280px",
            borderRadius: "30px",
            background: "#eee",
            marginBottom: "60px",
            animation: "pulse 1.2s infinite",
          }}
        />

        {/* CATEGORY SKELETON */}
        <div style={{ display: "flex", gap: "30px", justifyContent: "center" }}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              style={{
                width: "220px",
                height: "150px",
                borderRadius: "20px",
                background: "#eee",
                animation: "pulse 1.2s infinite",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff1f8, #e6faff, #fff9e6)",
        padding: "60px 20px",
      }}
    >
      {/* HERO */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          padding: "160px 40px",
          borderRadius: "40px",
          textAlign: "center",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            color: "#d63384",
            marginBottom: "15px",
          }}
        >
          Nanhe Farishte <br /> Kiran Knits
        </h1>

        <p style={{ fontSize: "20px", marginBottom: "30px" }}>
          Har bunai mein maa ka pyaar 💖
        </p>

        <Link to="/products">
          <button
            style={{
              padding: "16px 45px",
              borderRadius: "30px",
              background: "linear-gradient(135deg, #ff4f87, #ff85a2)",
              color: "#fff",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
             Shop Now
          </button>
        </Link>
      </div>

      {/* CATEGORY */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "120px auto 0",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "38px",
            marginBottom: "50px",
            color: "#444",
          }}
        >
          Our Categories
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {[
            { name: "Sweater", emoji: "🧥" },
            { name: "Socks", emoji: "🧦" },
            { name: "Cap", emoji: "🧢" },
          ].map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  padding: "45px 60px",
                  borderRadius: "30px",
                  fontSize: "26px",
                  fontWeight: "700",
                  color: "#333",
                  background: "#fff",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                  transition: "0.3s",
                  minWidth: "220px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-10px) scale(1.05)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #ffe0f0, #e0f7ff)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0) scale(1)";
                  e.currentTarget.style.background = "#fff";
                }}
              >
                <div style={{ fontSize: "45px", marginBottom: "10px" }}>
                  {cat.emoji}
                </div>
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div style={{ maxWidth: "1100px", margin: "100px auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          Featured Products
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "30px",
          }}
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;