const { Server } = require("socket.io");
const socketAuth = require("../middlewares/socket.middleware");
const aiChatSocket = require("../controllers/aiChat.Controller");

const initSocketServer = async (httpServer) => {
  // init io server
  const io = new Server(httpServer, {
    cors:{
      origin:"http://localhost:5173",
        methods: ["GET", "POST"],
        credentials:true,
    }
  });

  // middleware for authanticatio
  io.use(socketAuth);

  // socket connect handler
  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // ai-chatBot
    aiChatSocket(io, socket);
  });
};

module.exports = {
  initSocketServer,
};
