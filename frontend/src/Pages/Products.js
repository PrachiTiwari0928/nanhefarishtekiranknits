import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard"; // ✅ add this

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    setLoading(true);

    // 🔥 thoda delay (premium feel)
    setTimeout(() => {
      if (category) {
        setFilteredProducts(
          products.filter(
            (p) =>
              p.category.toLowerCase() === category.toLowerCase()
          )
        );
      } else {
        setFilteredProducts(products);
      }

      setLoading(false);
    }, 700);
  }, [category]);

  return (
    <div style={{ padding: "60px 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Products
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
          maxWidth: "1100px",
          margin: "auto",
        }}
      >
        {/* ✅ Skeleton OR Products */}
        {loading
          ? Array(6)
              .fill()
              .map((_, i) => <SkeletonCard key={i} />)
          : filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default Products;