const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const indexRoutes = require("./routes/index.route");
const channelRoute = require("./routes/channel.route");
const chatRoute = require("./routes/chat.route");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

// require("./config/passport"); // Passport configuration

// app.use(passport.initialize());

// routes would be added here in the future
app.use("/auth", authRoutes);
app.use("/", indexRoutes);
app.use("/channel", channelRoute);
app.use("/chat" , chatRoute )

module.exports = app;
