const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

let sessionNumber = 100;

let rooms = [];

const io = new Server(server, {
  cors : {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  console.log(`User connected: ${socket.id}`);

  // Start Testing
  socket.broadcast.emit("hello_world", {message: "hello"});
  socket.on("send_message", (data) => {
    console.log(data);

    // le hace broadcast a todos excepto al cliente actual
    socket.broadcast.emit("received_message", data);

    // le envia mensaje al cliente actual
    socket.emit("received_message", data);
  })
  // End Testing

  socket.on("join_session", (joinInfo) => {
    console.log(`${joinInfo.playerName} Trying to join session with number ${joinInfo.sessionId}`);

    let canJoin = false;
    let roomIndex = -1;
    if (rooms.length > 0) {
      roomIndex = rooms.findIndex(x => x.id == joinInfo.sessionId);
      console.log(`rooms ${rooms[0].id} found ${roomIndex}`);
    }

    if (roomIndex != -1 && rooms[roomIndex].playersCount < 7) {
      ++rooms[roomIndex].playersCount;
      socket.join(sessionId);
      canJoin = true;
      socket.broadcast.emit("new_join_player", joinInfo.playerName);
      console.log(`Joined session with number ${joinInfo.sessionId}`);
    } else {
      console.log(`Not joined session with number ${joinInfo.sessionId}`);
    }
    socket.emit("join_validation", canJoin);
  })


  socket.on("create_session", () => {
    rooms.push({id : sessionNumber, playersCount : 1, topCard : "null", winnerPlayer : "null"});
    console.log(`rooms ${rooms}`);

    socket.join(sessionNumber);
    socket.emit("room_id", sessionNumber);
    console.log(`Created session with number ${sessionNumber}`);
    // TODO: increment session number after creating the room
  })

});



server.listen(3001, () => {
  console.log("Server running");
});
