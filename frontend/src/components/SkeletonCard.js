import React from "react";

const SkeletonCard = () => {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          width: "100%",
          height: "200px",
          borderRadius: "15px",
          background: "#eee",
          marginBottom: "15px",
          animation: "pulse 1.5s infinite",
        }}
      />

      {/* TEXT */}
      <div
        style={{
          height: "15px",
          width: "70%",
          background: "#eee",
          marginBottom: "10px",
          borderRadius: "10px",
          animation: "pulse 1.5s infinite",
        }}
      />

      <div
        style={{
          height: "15px",
          width: "40%",
          background: "#eee",
          borderRadius: "10px",
          animation: "pulse 1.5s infinite",
        }}
      />
    </div>
  );
};

export default SkeletonCard;