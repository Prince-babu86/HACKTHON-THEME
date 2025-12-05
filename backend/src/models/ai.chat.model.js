const mongoose = require("mongoose");

const aiChatSchema = new mongoose.Schema(
  {
    // conversationId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: false,
    //   index: true
    // },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: ["ai", "user"],
      required: true,
    },

    text: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIChat", aiChatSchema);
