const usermodel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { sendEmail } = require("../services/email.service");
const registerSuccessEmail = require("../utils/registerEmailContent");

const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = await usermodel.create({
      fullname,
      email,
      password: hashedPassword,
      provider: "manual",
    });

    const token = jwt.sign({ userId: newuser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    res
      .status(201)
      .json({ message: "User registered successfully", token, newuser });

      await sendEmail(
      newuser.email,
      "Welcome to Our App",
      `Hello ${newuser.fullname},\n\nThank you for signing up using Google authentication! We're excited to have you on board.\n\nBest regards,\nThe Team`,
      registerSuccessEmail(
        newuser.fullname,
        "Hackthon Theme",
        "ecomart-theta.vercel.app/"
      )
    );
  } catch (error) {
    console.error(error);
  }
};

// login user function can be added here in future

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await usermodel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token);
    res
      .status(200)
      .json({ message: "User logged in successfully", token, existingUser });
  } catch (error) {
    console.error(error);
  }
};

// google authentication controller

const googleAuthController = async (req, res) => {
  try {
    const user = req.user; // Retrieved from Passport.js
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    res
      .status(200)
      .json({ message: "User authenticated via Google", token, user });
    console.log(user.email);
    await sendEmail(
      user.email,
      "Welcome to Our App",
      `Hello ${user.fullname},\n\nThank you for signing up using Google authentication! We're excited to have you on board.\n\nBest regards,\nThe Team`,
      registerSuccessEmail(
        user.fullname,
        "Hackthon Theme",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZSUyMGJ1aWxkaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
      )
    );
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser, googleAuthController };
