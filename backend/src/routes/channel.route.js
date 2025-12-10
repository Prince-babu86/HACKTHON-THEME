const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {createChannel , getChannels, getSingleChannel, SendMessagesChannel, getChannelAllMessages} = require("../controllers/channel.controller");
const upload = require("../config/multer");
const router = express.Router();

router.post("/create", authMiddleware, upload.single("logoUrl") , createChannel);

router.get("/all" , authMiddleware , getChannels);

router.get("/:id" , authMiddleware , getSingleChannel);

router.post("/message/:id" , authMiddleware , upload.single("fileUrl") , SendMessagesChannel);

router.get("/all-messages/:id" , authMiddleware , getChannelAllMessages);

module.exports = router;
