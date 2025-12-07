const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {createChannel , getChannels, getSingleChannel} = require("../controllers/channel.controller");
const upload = require("../config/multer");
const router = express.Router();

router.post("/create", authMiddleware, upload.single("logoUrl") , createChannel);

router.get("/all" , authMiddleware , getChannels);

router.get("/:id" , authMiddleware , getSingleChannel)

module.exports = router;
