const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // manual signup only
    profilePic: { type: String, default: "" },
    provider: { type: String, default: "manual" }, // manual or google
    username: { type: String, required: false, unique: true },
    bio: { type: String, default: "" },
    phone: { type: String, default: "" },
    status: { type: String, enum: ["online", "offline", "busy"], default: "offline" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
