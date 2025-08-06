const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const session = require("express-session");

// 👇 This line is crucial
require("./passport")


// Optional if using sessions: app.use(passport.session());


// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: 'https://astronewai.vercel.app', // ✅ your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(session({
  secret: "secret_key",
  resave: false,
  saveUninitialized: true,
   cookie: {
    secure: true, // ✅ only over HTTPS
    sameSite: 'none' // ✅ for cross-origin cookies
  }
}));


app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/user', require('./routes/payment'));

// ✅ Async Mongoose connection and server startup
mongoose
  .connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

