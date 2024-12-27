const app = require("./app");
const http = require("http");
const socketIo = require("socket.io");

require("dotenv").config();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (data) => {
    console.log("Message received:", data);
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
