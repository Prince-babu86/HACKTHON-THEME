const ConversationModel = require("../models/conversationModel");
const messageModel = require("../models/MessagesModel");
const usermodel = require("../models/user.model");

const SendMessage = async (io, socket) => {
  try {
    const senderId = socket.user._id;

    socket.on("send-message", async (data) => {
      const { receiverId, text } = data;

      if (!text || !receiverId) {
        return;
      }

      // 1️⃣ find existing conversation
      let conversation = await ConversationModel.findOne({
        participants: { $all: [senderId, receiverId], $size: 2 },
      });

      // 2️⃣ create conversation if not exists

      if (!conversation) {
        conversation = await ConversationModel.create({
          participants: [senderId, receiverId],
        });
      }

      const convoId = conversation._id.toString();

      socket.join(convoId);

      // 3️⃣ create message
      const message = await messageModel.create({
        senderId: senderId,
        text: text.trim(),
        conversationId: convoId,
      });

      // 4️⃣ update lastMessage

      conversation.lastMessage = message._id;
      await conversation.save();

      io.to(convoId).emit("receive-message", message);
    });
  } catch (error) {
    console.log(error);
  }
};


const getConversation = async (req, res) => {
  try {
    const userId = req.user._id;

    const convos = await ConversationModel.find({
      participants: userId,
      lastMessage: { $exists: true },
    })
      .populate("participants", "fullname email profilePic")
      .populate({
        path: "lastMessage",
        populate: {
          path: "senderId",
          select: "fullname email profilePic",
        },
      })
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All conversations fetched",
      conversations: convos,
    });
  } catch (error) {
    console.error("getConversation error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = {
  SendMessage,
  getConversation
};
