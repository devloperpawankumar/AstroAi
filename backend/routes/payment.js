// routes/payment.js
const Razorpay = require('razorpay');
const express = require('express');
const router = express.Router();
require('dotenv').config(); // Load env variables

// Initialize Razorpay with keys from .env
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  const options = {
    amount: amount * 100, // amount in paisa
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ order });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ error: "Server error, could not create order" });
  }
});

module.exports = router;