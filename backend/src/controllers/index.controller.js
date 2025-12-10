const userModel = require("../models/user.model");

const getContactUsers = async (req, res) => {
  try {
    const users = await userModel.find(
      {},
      "fullname username profilePic status phone email"
    );
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};




module.exports = {
  getContactUsers,
 
};
