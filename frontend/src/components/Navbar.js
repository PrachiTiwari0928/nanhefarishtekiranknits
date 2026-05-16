import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={navStyle}>
      {/* LOGO */}
      <h2 style={{ color: "#ff4f87", margin: 0, cursor: "pointer" }}
        onClick={() => navigate("/")}>
        Nanhe Farishte
      </h2>

      {/* MENU */}
      <div style={menuStyle}>
        <NavButton to="/">Home</NavButton>
        <NavButton to="/products">Products</NavButton>
        <NavButton to="/about">About</NavButton>
        <NavButton to="/contact">Contact</NavButton>
        <NavButton to="/my-orders">Orders</NavButton>

        {/* USER */}
        {user ? (
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <FaUserCircle
              size={35}
              color="#555"
              style={{ cursor: "pointer" }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div style={dropdownStyle}>
                <p style={{ fontWeight: "600" }}>{user.name}</p>

                <button onClick={() => navigate("/profile")} style={btnLight}>
                  Profile
                </button>

                <button onClick={handleLogout} style={btnDanger}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavButton to="/login">Login</NavButton>
        )}
      </div>

      {/* CART */}
      <Link to="/cart" style={{ textDecoration: "none", position: "relative" }}>
        <button style={cartBtn}>
          🛒 Cart
          {cartItems.length > 0 && (
            <span style={badge}>{cartItems.length}</span>
          )}
        </button>
      </Link>
    </div>
  );
};

/* ================= NAV BUTTON ================= */
const NavButton = ({ to, children }) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <button style={navBtn}>{children}</button>
    </Link>
  );
};

/* ================= STYLES ================= */

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 40px",
  background: "linear-gradient(90deg, #ffd6ec, #d6faff)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
};

const menuStyle = {
  display: "flex",
  gap: "12px",
  alignItems: "center"
};

const navBtn = {
  background: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "500"
};

const cartBtn = {
  background: "#ff4f87",
  border: "none",
  padding: "10px 18px",
  borderRadius: "25px",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
  position: "relative"
};

const badge = {
  position: "absolute",
  top: "-6px",
  right: "-8px",
  background: "red",
  color: "white",
  borderRadius: "50%",
  fontSize: "12px",
  padding: "2px 6px"
};

const dropdownStyle = {
  position: "absolute",
  top: "50px",
  right: 0,
  background: "white",
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  minWidth: "150px",
  textAlign: "center"
};

const btnLight = {
  width: "100%",
  padding: "6px",
  marginTop: "5px",
  border: "none",
  background: "#eee",
  borderRadius: "5px",
  cursor: "pointer"
};

const btnDanger = {
  width: "100%",
  padding: "6px",
  marginTop: "5px",
  border: "none",
  background: "#ff4f87",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer"
};

export default Navbar;