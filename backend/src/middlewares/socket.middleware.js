const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const usermodel = require("../models/user.model");

const socketAuth = async (socket, next) => {
  const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

  if (!cookies.token) {
    next(new Error("Authentication error: No token Provided"));
  }

  try {
    const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
    const user = await usermodel.findById(decoded.userId);
    if (!user) {
      return next(new Error("Authentication error: User not found"));
    }

    socket.user = user;
    next();
  } catch (error) {
    next(new Error("Authentication error : invalid token"));
  }
};

module.exports = socketAuth;
