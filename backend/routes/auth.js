const express = require('express');
const router = express.Router();
const { signup, login, verify, forgotPassword, resetPassword } = require('../controllers/authController');
const passport = require('passport');
const { generateToken } = require('../utils/generateToken'); // <-- make sure this 
const User = require("../models/User")

// ===========================
// Auth Routes
// ===========================
router.post('/signup', signup);
router.get("/verify", verify);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


// ===========================
// Google Auth
// ===========================
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account", 
}));

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err) {
      console.error("Google Auth Error:", err);
      return res.redirect("http://localhost:3000/login?error=server_error");
    }

    if (!user) {
      // Custom message from done(null, false, { message })
      const message = info?.message || "Google login failed";
      return res.redirect(`http://localhost:3000/login?error=${encodeURIComponent(message)}`);
    }

    // User authenticated successfully
    const token = generateToken(user);
    return res.redirect(`http://localhost:3000/detail?token=${token}`);
  })(req, res, next);
});



// ===========================
// Apple Auth
// ===========================

// Start Apple OAuth flow
router.get("/apple", passport.authenticate("apple"));

// Apple OAuth callback
router.post("/apple/callback", // Apple uses POST callback usually
  passport.authenticate("apple", { failureRedirect: "/" }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`http://localhost:3000/detail?token=${token}`);
});

// ===========================
// Microsoft Auth
// ===========================

// Start Microsoft OAuth flow
router.get("/microsoft", passport.authenticate("microsoft", {
  scope: ['openid', 'profile', 'email']
}));

// Microsoft OAuth callback
router.get("/microsoft/callback",
  passport.authenticate("microsoft", { failureRedirect: "/" }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`http://localhost:3000/detail?token=${token}`);
});


module.exports = router;
