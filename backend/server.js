require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const sendAdminPaymentMail = require("./utils/sendMail");
const transporter = require("./utils/mailer");

// Models
const User = require("./models/user");
const Order = require("./models/Order");

const app = express();
app.use(express.json());
app.use(cors());

/* ===============================
   DB CONNECT
================================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

/* ===============================
   OTP STORE
================================= */
const otpStore = {};

/* ===============================
   REGISTER
================================= */
app.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) return res.json("User Already Exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    await new User({
      name,
      phone,
      email,
      password: hashedPassword
    }).save();

    res.json("User Registered Successfully");
  } catch (err) {
    res.status(500).json("Registration Error");
  }
});

/* ===============================
   LOGIN
================================= */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.json({ message: "User Not Found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.json({ message: "Wrong Password" });

    res.json({
      message: "Login Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Login Error" });
  }
});

/* ===============================
   SEND OTP
================================= */
app.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json("User Not Found");

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "OTP for Password Reset",
      html: `<h2>Your OTP is <b>${otp}</b></h2>`
    });

    res.json("OTP Sent to Email");

  } catch (err) {
    console.log(err);
    res.status(500).json("OTP Error");
  }
});

/* ===============================
   RESET PASSWORD
================================= */
app.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json("User Not Found");

    if (otpStore[email] != otp) {
      return res.json("Invalid OTP");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    delete otpStore[email];

    res.json("Password Updated Successfully");

  } catch (err) {
    res.status(500).json("Reset Error");
  }
});

/* ===============================
   PLACE ORDER (🔥 FIXED + DEBUG)
================================= */
app.post("/place-order", async (req, res) => {
  try {

    // 🔥 DEBUG (IMPORTANT)
    console.log("📦 ORDER BODY RECEIVED:", req.body);

    const order = new Order({
      userId: req.body.userId,
      name: req.body.name,

      address: req.body.address,
      pincode: req.body.pincode,
      altAddress: req.body.altAddress,

      // ⭐ PRODUCT DATA (CRITICAL FOR IMAGE + PRICE)
      productId: req.body.productId || null,
      productName: req.body.productName || "Unknown Product",
      productImage: req.body.productImage || "",
      productPrice: req.body.productPrice || 0,
      quantity: req.body.quantity || 1,

      paymentMethod: req.body.paymentMethod,

      paymentStatus:
        req.body.paymentMethod === "qr" ? "pending" : "approved",

      orderStatus:
        req.body.paymentMethod === "qr" ? "waiting" : "confirmed",

      expiresAt:
        req.body.paymentMethod === "qr"
          ? new Date(Date.now() + 2 * 60 * 1000)
          : null
    });

    await order.save();

    if (req.body.paymentMethod === "qr") {
      await sendAdminPaymentMail(order);
    }

    res.json({
      message: "Order Created",
      order
    });

  } catch (err) {
    console.log("ORDER ERROR:", err);
    res.status(500).json({ message: "Order failed" });
  }
});

/* ===============================
   MY ORDERS
================================= */
app.get("/my-orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
      paymentStatus: "approved"
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json("Error fetching orders");
  }
});

/* ===============================
   ADMIN PENDING PAYMENTS
================================= */
app.get("/admin/pending-payments", async (req, res) => {
  try {
    const orders = await Order.find({
      paymentStatus: "pending"
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json("Error fetching pending payments");
  }
});

/* ===============================
   ORDER STATUS
================================= */
app.get("/order-status/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json("Not Found");

    res.json(order);
  } catch (err) {
    res.status(500).json("Error");
  }
});

/* ===============================
   ADMIN APPROVE PAYMENT
================================= */
app.get("/admin/approve-payment/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      if (req.accepts('html')) {
        return res.status(404).send("<h2>Order Not Found</h2>");
      } else {
        return res.status(404).json("Order Not Found");
      }
    }

    order.paymentStatus = "approved";
    order.orderStatus = "confirmed";

    await order.save();

    if (req.accepts('html')) {
      res.send(`
        <div style="text-align:center; font-family:Arial; padding:50px;">
          <h2 style="color:green;">✅ Payment Approved Successfully!</h2>
          <p>Order ID: ${order._id}</p>
          <p>Customer: ${order.name}</p>
          <p>You can close this window.</p>
        </div>
      `);
    } else {
      res.json("Payment Approved");
    }
  } catch (err) {
    if (req.accepts('html')) {
      res.status(500).send("<h2>Error approving payment</h2>");
    } else {
      res.status(500).json("Error approving payment");
    }
  }
});

/* ===============================
   ADMIN REJECT PAYMENT
================================= */
app.get("/admin/reject-payment/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      if (req.accepts('html')) {
        return res.status(404).send("<h2>Order Not Found</h2>");
      } else {
        return res.status(404).json("Order Not Found");
      }
    }

    order.paymentStatus = "rejected";
    order.orderStatus = "payment_failed";

    await order.save();

    if (req.accepts('html')) {
      res.send(`
        <div style="text-align:center; font-family:Arial; padding:50px;">
          <h2 style="color:red;">❌ Payment Rejected!</h2>
          <p>Order ID: ${order._id}</p>
          <p>Customer: ${order.name}</p>
          <p>You can close this window.</p>
        </div>
      `);
    } else {
      res.json("Payment Rejected");
    }
  } catch (err) {
    if (req.accepts('html')) {
      res.status(500).send("<h2>Error rejecting payment</h2>");
    } else {
      res.status(500).json("Error rejecting payment");
    }
  }
});

/* ===============================
   NOTIFY ADMIN (SEND EMAIL)
================================= */
app.post("/notify-admin/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) return res.status(404).json("Order Not Found");

    await sendAdminPaymentMail(order);

    res.json("Admin notified via email");
  } catch (err) {
    res.status(500).json("Error sending notification");
  }
});

/* ===============================
   START SERVER
================================= */
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});