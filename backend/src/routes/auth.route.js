const express = require("express");
const {
  registerUser,
  googleAuthController,
  updateProfile,
} = require("../controllers/auth.controller");
const passport = require("passport");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");

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

const upload = multer({storage: multer.memoryStorage()});



router.put("/profile/update" , authMiddleware , upload.single("profilePic") , updateProfile);

module.exports = router;
