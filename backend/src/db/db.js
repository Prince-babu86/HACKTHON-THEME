const moongoose = require('mongoose');


const connectDB = async () => {
    try {
        await moongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}


module.exports = connectDB;