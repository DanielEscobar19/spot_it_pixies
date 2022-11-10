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

  socket.on("send_message", (message) => {
    console.log("rooms ", socket.rooms);
    socket.emit("received_message", socket.rooms[1]);
  });

  socket.on("join-socket-room", (number) => {
    socket.join(number);
    console.log("socket joined rooms ", socket.rooms);
  })

  socket.on("cliente-pedir-cartas", (data) =>{
    console.log("Pin ", data);
    let roomIndex =  rooms.findIndex(x => x.id == data);
    console.log("roomIndex ", roomIndex);
    console.log("rooms[roomIndex] ", rooms[roomIndex]);

    let cartaARepartir = rooms[roomIndex].cardToDeal;
    let cartasPorJugador = (56 / rooms[roomIndex].playersCount)
    socket.emit("servidor-enviar-cartas", [shuffledCards.slice(cartaARepartir,(cartaARepartir + cartasPorJugador)), wellTop]);
    cartaARepartir += (cartasPorJugador -1)
  });

  socket.on("simbolo_seleccionado", (data) => {
    console.log("simbolo_seleccionado data", data);
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


  socket.on("join_session", (playerName, sessionId) => {
    console.log(`${playerName} Trying to join session with number ${sessionId}`);

    let roomIndex = -1;
    if (rooms.length > 0) {
      roomIndex = rooms.findIndex(x => x.id == sessionId);
      console.log(`Join session: forund room id (${rooms[0].id}) found at index ${roomIndex}`);
    }

    if (roomIndex != -1 && rooms[roomIndex].playersCount < 8) {
      ++rooms[roomIndex].playersCount;
      socket.join(sessionId);
      console.log(`Joined session with number ${sessionId}`);
      rooms[roomIndex].players.push(playerName);
      console.log("Socket rooms: ", socket.rooms);
      console.log("sessionId received: ", sessionId, " data type ", typeof parseInt(sessionId));
      // TODO: cambiar el 100 quemado 
      socket.to(parseInt(sessionId)).emit("new_join_player", rooms[roomIndex].players);
      socket.emit("new_join_player", rooms[roomIndex].players);
      socket.emit("join_validation", true, rooms[roomIndex].sessionName);
    } else {
      console.log(`Not joined session with number ${sessionId}`);
      socket.emit("join_validation", false, "");
    }
  })

  socket.on("start_game", (sessionId) => {
    console.log("Host started the game");
    console.log("sessionId received: ", sessionId, " data type ", typeof sessionId);
    console.log("Socket rooms: ", socket.rooms);
    socket.broadcast.emit("started_game", "useless");
  });

  socket.on("get_players", (sessionId) => {
    let roomIndex = -1;
    if (rooms.length > 0) {
      roomIndex = rooms.findIndex(x => x.id == sessionId);
      console.log(`Update: searched room id (${sessionId}) found at index ${roomIndex}`);
    }
    if (roomIndex !== -1) {
      socket.emit("players_list", rooms[roomIndex].players);
    }
  })

  socket.on("create_session", (hostName, sessionName) => {
    if (rooms.length > 0 && rooms.findIndex(x => x.id == sessionNumber) > -1) {
      console.log(`The room already exists room id ${rooms[0].id}`);
    } else {
      rooms.push({id : sessionNumber, sessionName : sessionName, playersCount : 1, cardToDeal : 1, winnerPlayer : "null", players: [hostName]});
      console.log(`rooms ${rooms}`);
  
      socket.join(sessionNumber);
      socket.emit("room_id", sessionNumber);
      console.log(`Created session with number ${sessionNumber}`);
      // TODO: increment session number after creating the room
    }
  })
});


server.listen(3001, () => {
  console.log("Server running");
});
