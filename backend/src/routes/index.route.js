const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const getProfile = require("../controllers/profile.controller");
const { getContactUsers } = require("../controllers/index.controller");
const generateText = require("../services/ai.service");
const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

router.get("/contact-users", authMiddleware, getContactUsers);


router.get("/ai" , authMiddleware , async(req  , res) => {
  const response =   await generateText("Hello who are you");
  return res.json({
    response
  })
})

module.exports = router;
