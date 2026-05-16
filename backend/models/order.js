const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },

  name: String,

  address: String,
  pincode: String,
  altAddress: String,

  // ================= PAYMENT =================
  paymentMethod: {
    type: String,
    enum: ["cod", "qr", "card"],
    default: "cod"
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  orderStatus: {
    type: String,
    enum: ["waiting", "confirmed", "payment_failed"],
    default: "waiting"
  },

  // ================= PRODUCT DETAILS =================
  productId: {
    type: String,
    required: true
  },

  productName: {
    type: String,
    required: true
  },

  productImage: {
    type: String,
    required: true
  },

  productPrice: {
    type: Number,
    required: true,
    default: 0
  },

  quantity: {
    type: Number,
    default: 1
  },

  expiresAt: Date,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);