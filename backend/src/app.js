const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true,
}))

require("./config/passport"); // Passport configuration

app.use(passport.initialize());

// routes would be added here in the future
app.use("/auth", authRoutes);

module.exports = app;
