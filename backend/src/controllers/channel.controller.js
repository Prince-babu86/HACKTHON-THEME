const channelmodel = require("../models/channel.model");
const channelMessagesModel = require("../models/channelMessages.model");
const userModel = require("../models/user.model");
const uploadImage = require("../services/imagekit.service");
const { v4: uuidv4 } = require("uuid");

const createChannel = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id;
  const file = req.file;

  try {
    if (!name || !name.trim()) {
      return res.send("Name is required");
    }

    let logoUrl = "";

    if (file) {
      const result = await uploadImage(file.buffer, `${uuidv4()}`);
      logoUrl = result.url;
    }

    const channel = await channelmodel.create({
      name,
      description,
      createdBy: userId,
      followers: [userId],
      logoUrl,
    });

    const user = await userModel.findByIdAndUpdate(userId, {
      $addToSet: {
        followedChannels: [channel._id],
      },
    });

    return res.status(201).json({
      message: "file created sucessfully",
      channel,
    });
  } catch (error) {
    return new Error("Something went wrong");
  }
};

const getChannels = async (req, res) => {
  try {
    const channels = await channelmodel.find();
    return res.status(201).json({
      message: "Channels send sucessfully",
      channels,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something went wrong",
    });
  }
};

const getSingleChannel = async (req, res) => {
  const { id } = req.params;
  try {
    const channel = await channelmodel.findById(id);

    if (!channel) {
      return res.status(401).json({
        message: "Channel not found",
      });
    }

    return res.status(201).json({
      message: "Channel founded",
      channel,
    });
  } catch (error) {
    return res.status(402).status({
      message: "Something went wrong",
    });
  }
};

const SendMessagesChannel = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const file = req.file;
    const { text  } = req.body;

    let fileUrl = "";
    let messageType = "text";

    if (!text?.trim() && !file) {
      return res.status(400).json({ message: "Message or file is required" });
    }

    const channel = await channelmodel.findById(id);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    if (channel.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Only owner can send messages",
      });
    }

    // uploadfile if exist

    if (file) {
      const result = await uploadImage(file.buffer, `${uuidv4()}`);
      fileUrl = result.url;
      messageType = "image";
    }

    const message = await channelMessagesModel.create({
      text: text.trim(),
      sender: userId,
      type: messageType,
      channel: id,
      fileUrl,
    });

    return res.status(200).json({
      message: "Sent Sucessfuly",
      message,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};


const getChannelAllMessages = async (req , res) => {
  try {
    const {id} = req.params
    const messages = await channelMessagesModel.find({channel:id});
    return res.status(200).json({
      messages:"messages send sucessfully",
      messages
    })
  } catch (error) {
    return res.status(400).json({
      message:error
    })
  }
}

module.exports = {
  getChannels,
  createChannel,
  getSingleChannel,
  SendMessagesChannel,
  getChannelAllMessages
};
