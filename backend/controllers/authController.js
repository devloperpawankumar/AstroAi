const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'jk9876211@gmail.com',
    pass: 'zqsv romx ryhm ggjw',
  },
});


exports.signup = async (req, res) => {
  const { email } = req.body; // Include other fields if needed (e.g., username, full name, etc.)

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    // If the user exists and is already verified, return an error
    if (existingUser) {
      if (existingUser.verified === true) {
        return res.status(400).json({ msg: "User already verified." });
      } else {
        return res.status(400).json({ msg: "User already exists. Please verify your email." });
      }
    }

    // Create a new user instance
    const newUser = new User({
      email,
      verified: false,  // Set the user as unverified initially
    });

    // Save the new user to the database
    await newUser.save();

    // Generate the verification token
    const token = jwt.sign({ email }, "my-secret-key", { expiresIn: "7d" });

    // Generate the verification link
    const verifyLink = `http://localhost:3000/verify?token=${token}`;

    // Send the verification email using Nodemailer or any email service
    await transporter.sendMail({
      to: email,
      subject: "Verify your Email",
      html: `<p>Click here to verify your email: <a href="${verifyLink}">Verify Now</a></p>`,
    });

    return res.json({ msg: "Verification email sent.", token });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error, please try again later." });
  }
};


exports.verify = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, "my-secret-key");

    // 👉 Update user in DB to { verified: true }
    if (decoded){
      await User.updateOne({ email: decoded.email }, { verified: true });
    }

    return res.json({ msg: "Email verified!", verified: true }); // ✅ important
  } catch (err) {
    return res.status(400).json({ msg: "Invalid or expired token.", verified: false });
  }
};


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    // Generate a reset password token
    const token = jwt.sign({ email }, 'secret-key', { expiresIn: '1h' });

    // Create the reset password link
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    // Send email with the reset link
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Click the following link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
    });

    res.json({ msg: 'Password reset email sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error, please try again later.' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'secret-key');

    // Find the user based on email from the decoded token
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ msg: 'Password reset successful.' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Invalid or expired token.' });
  }
};

