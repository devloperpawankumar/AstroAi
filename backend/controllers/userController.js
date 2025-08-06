const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.updateDetails = async (req, res) => {
  const { id } = req.params;
  const {  dob, timeOfBirth, placeOfBirth,password } = req.body;

  try {
    const updated = await User.findOneAndUpdate(
      {email: id},
      { dob, timeOfBirth, placeOfBirth,password },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update user", error: err });
  }
};


exports.updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const {  name, dob, timeOfBirth, placeOfBirth } = req.body;

  try {
    const updated = await User.findOneAndUpdate(
      {email: id},
      {  name, dob, timeOfBirth, placeOfBirth },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update user", error: err });
  }
};


exports.getDetail = async (req, res) => {
  try {
    
    const user = await User.find({email:req.params.id})

    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};



exports.updateSignupDetails = async (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;

  try {
    let updateData = { name };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }
    console.log(updateData)
    const updatedUser = await User.findOneAndUpdate({email: id}, updateData, {
      new: true,
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update user", error: err });
  }
};




exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Step 1: Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Step 2: Prevent login if registered via Google
    if (user.googleId && user.googleId.trim() !== "") {
      return res.status(400).json({
        msg: "Your account was created using Google. Please login with Google.",
      });
    }

    // Step 3: Make sure password exists before comparing
    if (!user.password || user.password.trim() === "") {
      return res.status(400).json({
        msg: "Password not set. Please use the correct login method.",
      });
    }

    // Step 4: Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Step 5: Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "my-secret-key",
      { expiresIn: "1d" }
    );

    // Step 6: Respond with token and user info
    res.status(200).json({
      msg: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
