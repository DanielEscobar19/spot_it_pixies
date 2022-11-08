const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors : {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  console.log(`User connected: ${socket.id}`);

  // Start Testing
  socket.broadcast.emit("hello_world", {message: "hello"});
  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("received_message", data);
  })
  // End Testing
});


server.listen(3001, () => {
  console.log("Server running");
});
