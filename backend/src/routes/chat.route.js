const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { getConversation } = require("../controllers/chat.controller");



router.get("/convo", authMiddleware, getConversation);

module.exports = router;
