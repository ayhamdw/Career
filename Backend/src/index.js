const app = require("./app");
const http = require("http");
const socketIo = require("socket.io");

require("dotenv").config();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://192.168.1.11:7777", "http://192.168.1.34:7777", "*"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  allowEIO3: true,
  transports: ["websocket"],
});

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);
  console.log(`Transport used: ${socket.conn.transport.name}`);

  socket.on("sendMessage", (data) => {
    console.log("Message received:", data);
    io.emit("receiveMessage", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("stopTyping", (data) => {
    const { sender, receiver } = data;
    socket.to(receiver).emit("stopTyping");
  });

  socket.on("disconnect", (reason) => {
    console.log(`User ${socket.id} disconnected: ${reason}`);
  });
  socket.on("error", (error) => {
    console.log(`Socket Error: ${error}`);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
