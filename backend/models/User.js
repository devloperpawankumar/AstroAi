const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for social
  name: String,
  dob: String,
  timeOfBirth: String,
  placeOfBirth: String,
  googleId: String,
  microsoftId: String,
  verified: { type: Boolean, default: false },
  appleId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
