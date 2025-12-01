const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const passport = require("passport");

app.use(express.json());
app.use(cookieParser());

require("./config/passport"); // Passport configuration

app.use(passport.initialize());

// routes would be added here in the future
app.use("/auth", authRoutes);

module.exports = app;
