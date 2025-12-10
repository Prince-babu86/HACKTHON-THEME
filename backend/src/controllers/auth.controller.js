const usermodel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { sendEmail } = require("../services/email.service");
const registerSuccessEmail = require("../utils/registerEmailContent");
const uploadImage = require("../services/imagekit.service");
const { v4: uuidv4 } = require("uuid");

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

    const usernamePart =
      fullname.split(" ")[0].toLowerCase() + Math.floor(Math.random() * 1000);
    let username = usernamePart;

    const newuser = await usermodel.create({
      fullname,
      email,
      password: hashedPassword,
      provider: "manual",
      username,
    });

    const token = jwt.sign({ userId: newuser._id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    res.cookie("token", token, {
      httpOnly: false, // true only if you do not need to access from frontend
      secure: true,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res
      .status(201)
      .json({ message: "User registered successfully", token, newuser });

    //   await sendEmail(

    //   newuser.email,
    //   "Welcome to Our App",
    //   `Hello ${newuser.fullname},\n\nThank you for signing up using Google authentication! We're excited to have you on board.\n\nBest regards,\nThe Team`,
    //   registerSuccessEmail(
    //     newuser.fullname,
    //     "Hackthon Theme",
    //     "ecomart-theta.vercel.app/"
    //   )
    // );
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

    const existingUser = await usermodel.findOne({ email }).select("-password");
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

// const googleAuthController = async (req, res) => {
//   try {
//     const user = req.user; // Retrieved from Passport.js
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "8h",
//     });

//     // Set cookie first
//     res.cookie("token", token, {
//       httpOnly: false, // true only if you do not need to access from frontend
//       secure: false,
//       sameSite: "lax",
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     });

//     console.log("Google login:", user.email);

//     // await sendEmail(
//     //   user.email,
//     //   "Welcome to Our App",
//     //   `Hello ${user.fullname},\n\nThank you for signing up using Google authentication! We're excited to have you on board.\n\nBest regards,\nThe Team`,
//     //   registerSuccessEmail(
//     //     user.fullname,
//     //     "Hackthon Theme",
//     //     "ecomart-theta.vercel.app/"
//     //   )
//     // );

//     // redirect to frontend
//     return res.redirect("http://localhost:5173/");
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };

const updateProfile = async (req, res) => {
  try {
    const file = req.file;
    const data = req.body;
    const user = req.user;

    let result = null; // ✅ yaha declare

    if (data.fullname) user.fullname = data.fullname;
    if (data.username) user.username = data.username;
    if (data.bio) user.bio = data.bio;
    if (data.phone) user.phone = data.phone;
    if (data.status) user.status = data.status;

    if (file) {
      result = await uploadImage(file.buffer, `${uuidv4()}`);
      user.profilePic = result.url;
    }

    await user.save();

    return res.json({
      message: "Profile updated successfully",
      profilePic: user.profilePic,
      data,
    });
  } catch (error) {
    console.error("Update profile error:", error); // ✅ log always
    return res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  registerUser,
  loginUser,
  // googleAuthController,
  updateProfile,
};
