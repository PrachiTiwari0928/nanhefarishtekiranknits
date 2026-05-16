import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import PaymentPending from "./Pages/PaymentPending";
import MyOrders from "./Pages/MyOrders";
import Profile from "./components/Profile";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />

        <Routes>

          {/* MAIN PAGES */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* CART & CHECKOUT FLOW */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* ORDER FLOW */}
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/payment-pending" element={<PaymentPending />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* INFO PAGES */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />

          {/* USER AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>

        <Footer />

        <ToastContainer position="top-right" autoClose={2000} />
      </Router>
    </CartProvider>
  );
}

export default App;