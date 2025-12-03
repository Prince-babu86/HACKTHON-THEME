const usermodel = require("../models/user.model");



const getProfile = async (req, res) => {
    try {
    const user =  await usermodel.findById(req.user._id).select("-password");
    return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}


module.exports = getProfile