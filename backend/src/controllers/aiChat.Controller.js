// aiChat.Controller.js (or aiChatSocket.js)
const aiChatModel = require("../models/ai.chat.model");
const generateText = require("../services/ai.service");

module.exports = (io, socket) => {
  socket.on("user-message", async (payload) => {
    // payload can be: "hello"  OR  { text: "hello" }  OR  { message: "hello" }
    try {
      // normalize payload -> text (string)
      let text;
      if (typeof payload === "string") {
        text = payload;
      } else if (payload && typeof payload === "object") {
        text = payload.text ?? payload.message ?? "";
      } else {
        text = "";
      }

      text = (text || "").toString().trim();

      if (!text) {
        socket.emit("ai-message", "Empty message");
        return;
      }

      // Save user's message as a document (one message per doc model)
      await aiChatModel.create({
        // if you have socket.user._id use that, else null
        user: socket.user?._id ?? null,
        role: "user",
        text: text
      });

      // Generate AI response (ensure generateText returns a string)
      const aiReply = await generateText(text);
      const replyText = (typeof aiReply === "string") ? aiReply : (aiReply?.text ?? JSON.stringify(aiReply));

      // Save AI message
      await aiChatModel.create({
        user: socket.user?._id ?? null,
        role: "ai",
        text: replyText
      });

      // Emit plain text back to client (as you requested earlier)
      socket.emit("ai-message", replyText);

    } catch (err) {
      console.error("user-message handler error:", err);
      // send plain text error back
      socket.emit("ai-message", "Server error");
    }
  });
};
