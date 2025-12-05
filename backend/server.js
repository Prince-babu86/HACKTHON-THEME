require("dotenv").config();
const app = require("./src/app");
const { initSocketServer } = require("./src/config/socket");
const connectDB = require("./src/db/db");
const http = require("http");
const httpServer = http.createServer(app);

initSocketServer(httpServer);
connectDB();

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
