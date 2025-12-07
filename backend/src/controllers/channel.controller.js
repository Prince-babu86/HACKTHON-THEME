const channelmodel = require("../models/channel.model");
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

    const user = await userModel.findByIdAndUpdate(userId , {
        $addToSet:{
            followedChannels:[channel._id]
        }
    })

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
        message:"Something went wrong"
    })
  }
};


const getSingleChannel = async (req , res) => {
  const {id} = req.params
  try {
    const channel = await channelmodel.findById(id);

    if(!channel){
      return res.status(401).json({
        message:"Channel not found"
      })
    }

    return res.status(201).json({
      message:"Channel founded",
      channel
    })
    
  } catch (error) {
    return res.status(402).status({
      message:"Something went wrong"
    })
  }
}

module.exports = {
    getChannels,
    createChannel,
    getSingleChannel
};
