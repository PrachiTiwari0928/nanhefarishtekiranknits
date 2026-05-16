import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState("login");
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    otp: "",
    newPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= LOGIN ================= */
  const loginUser = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: form.email,
        password: form.password
      });

      if (res.data.message === "Login Successful") {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setShowSuccess(true);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Login Error");
    }
  };

  /* ================= LOGIN SUCCESS ================= */
  const handleOk = () => {
    setShowSuccess(false);
    navigate("/profile");
    window.location.reload();
  };

  /* ================= REGISTER ================= */
  const registerUser = async () => {
    try {
      const res = await axios.post("http://localhost:5000/register", form);
      alert(res.data);
      setPage("login");
    } catch (err) {
      alert("Registration Error");
    }
  };

  /* ================= SEND OTP (EMAIL) ================= */
  const sendOTP = async () => {
    try {
      const res = await axios.post("http://localhost:5000/send-otp", {
        email: form.email
      });
      alert(res.data);
    } catch (err) {
      alert("OTP Error");
    }
  };

  /* ================= RESET PASSWORD ================= */
  const resetPassword = async () => {
    try {
      const res = await axios.post("http://localhost:5000/reset-password", {
        email: form.email,
        otp: form.otp,
        newPassword: form.newPassword
      });

      alert(res.data);
      setPage("login");
    } catch (err) {
      alert("Reset Error");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      
      {/* LOGIN */}
      {page === "login" && (
        <div style={boxStyle}>
          <h2>Login</h2>

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={inputStyle}
          />

          <button onClick={loginUser} style={btnStyle}>Login</button>

          <p onClick={() => setPage("register")} style={linkStyle}>Register</p>
          <p onClick={() => setPage("forgot")} style={linkStyle}>Forgot Password?</p>
        </div>
      )}

      {/* REGISTER */}
      {page === "register" && (
        <div style={boxStyle}>
          <h2>Register</h2>

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={inputStyle}
          />

          <button onClick={registerUser} style={btnStyle}>Register</button>

          <p onClick={() => setPage("login")} style={linkStyle}>Back to Login</p>
        </div>
      )}

      {/* FORGOT PASSWORD */}
      {page === "forgot" && (
        <div style={boxStyle}>
          <h2>Reset Password</h2>

          <input
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            style={inputStyle}
          />

          <button onClick={sendOTP} style={btnStyle}>Send OTP</button>

          <input
            name="otp"
            placeholder="Enter OTP"
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            onChange={handleChange}
            style={inputStyle}
          />

          <button onClick={resetPassword} style={btnStyle}>Update Password</button>

          <p onClick={() => setPage("login")} style={linkStyle}>Back</p>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div style={overlayStyle}>
          <div style={popupBox}>
            <h3>Login Successful 🎉</h3>
            <button onClick={handleOk} style={btnStyle}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

/* ================= STYLES ================= */
const boxStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  width: "300px",
  textAlign: "center"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #ccc"
};

const btnStyle = {
  width: "100%",
  padding: "10px",
  border: "none",
  borderRadius: "20px",
  background: "#ff4f87",
  color: "#fff",
  cursor: "pointer",
  marginTop: "10px"
};

const linkStyle = {
  marginTop: "10px",
  cursor: "pointer",
  color: "#ff4f87"
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const popupBox = {
  background: "#fff",
  padding: "25px",
  borderRadius: "15px",
  textAlign: "center"
};