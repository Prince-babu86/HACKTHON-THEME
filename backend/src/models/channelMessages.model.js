// models/channelMessage.model.js
const mongoose = require("mongoose");

const channelMessageSchema = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },
    text: String,
    fileUrl: String, // for images/files
    meta: Object, // extra info if needed
  },
  { timestamps: true }
);

const channelMessagesModel = mongoose.model("ChannelMessage", channelMessageSchema);
module.exports = channelMessagesModel;
