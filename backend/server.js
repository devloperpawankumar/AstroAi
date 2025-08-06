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


const corsOptions = {
  origin: "https://astronewai.vercel.app", // ✅ No trailing slash
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(session({
  secret: "secret_key",
  resave: false,
  saveUninitialized: true
}));
app.use(cors(corsOptions));

// ✅ Add this to explicitly handle OPTIONS requests:
app.options("*", cors(corsOptions));
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

