const express = require("express");
const {
  registerUser,
  googleAuthController,
} = require("../controllers/auth.controller");
const passport = require("passport");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

// Define your authentication routes here

router.get("/", (req, res) => {
  res.send("Auth Route");
});

router.post("/register", registerUser);

router.get(
  "/google",
  passport.authenticate("google", {
     scope: ["profile", "email"],
     accessType: "offline",
     prompt: "consent",
    
    })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { 
     failureRedirect:"http://localhost:5173/login",
    session: false }),
  googleAuthController
);


router.get("/protected", authMiddleware , (req, res) => {
  res.json({ message: "You have accessed a protected route" , user: req.user});
});

module.exports = router;
