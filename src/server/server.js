const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");
const cards = require("./cards.json");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors : {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let shuffledCards = shuffleCards(cards);

let wellTop = shuffledCards[0].simbolos; 

// funcion que randomiza un arreglo
 function arrayShuffle(array) {
	if (!Array.isArray(array)) {
		throw new TypeError(`Expected an array, got ${typeof array}`);
	}

	array = [...array];

	for (let index = array.length - 1; index > 0; index--) {
		const newIndex = Math.floor(Math.random() * (index + 1));
		[array[index], array[newIndex]] = [array[newIndex], array[index]];
	}

	return array;
}

function shuffleCards (cartas) {
  let unshuffledCards = cartas;
  for (let i = 0; i < unshuffledCards.length; i += 1) {
      unshuffledCards[i].simbolos = arrayShuffle(unshuffledCards[i].simbolos);
  }
  return arrayShuffle(unshuffledCards);
}

let sessionNumber = 100;

let rooms = [];

io.on("connection", (socket) => {

  console.log(`User connected: ${socket.id}`);

  socket.on("cliente-pedir-cartas", (data) =>{
    let cartaARepartir = rooms[data].cardToDeal;
    socket.emit("servidor-enviar-cartas", [shuffledCards.slice(cartaARepartir,(cartaARepartir + (56 / rooms[data].playersCount))), wellTop]);
  });

  socket.on("simbolo_seleccionado", (data) => {
    let esta = false;
    for (let i = 0; i < 8; i += 1) {
      if (data.simbolo == wellTop[i]) {
        esta = true;
        break;
      }
    }
    if (esta) {
      socket.emit("acerto-simbolo", [true]);
      wellTop = data.carta;
      socket.to(parseInt(data.sessionPin)).emit("cambio-top-well", wellTop);
      if (data.cantidadCartas == 1) {
        socket.to(parseInt(data.sessionPin)).emit("hay-ganador", true);
        socket.emit("hay-ganador", true);
      }
    } else {
      socket.emit("acerto-simbolo", [false]);
    }

    socket.on("guestIsReady", (data) => {
      let session = data.sessionPin.toString();
      socket.broadcast.emit("newReadyGuest", data);
    })

  })


  socket.on("join_session", (joinInfo) => {
    console.log(`${joinInfo.playerName} Trying to join session with number ${joinInfo.sessionId}`);

    let canJoin = false;
    let roomIndex = -1;
    if (rooms.length > 0) {
      roomIndex = rooms.findIndex(x => x.id == joinInfo.sessionId);
      console.log(`rooms ${rooms[0].id} found index ${roomIndex}`);
    }

    if (roomIndex != -1 && rooms[roomIndex].playersCount < 8) {
      ++rooms[roomIndex].playersCount;
      socket.join(joinInfo.sessionId);
      canJoin = true;
      rooms[roomIndex].players.push(joinInfo.playerName);
      // TODO: cambiar el 100 quemado 
      socket.broadcast.emit("new_join_player", rooms[roomIndex].players);
      socket.emit("new_join_player", rooms[roomIndex].players);
      console.log(`Joined session with number ${joinInfo.sessionId}`);
    } else {
      console.log(`Not joined session with number ${joinInfo.sessionId}`);
    }
    socket.emit("join_validation", canJoin);
  })


  socket.on("create_session", (name) => {
    rooms.push({id : sessionNumber, playersCount : 1, topCard : "null", winnerPlayer : "null", players: [name], cardToDeal: 1});
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
