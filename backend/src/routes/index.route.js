const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const getProfile = require("../controllers/profile.controller");
const { getContactUsers } = require("../controllers/index.controller");
const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

router.get("/contact-users", authMiddleware, getContactUsers);

module.exports = router;
