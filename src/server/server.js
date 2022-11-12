const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");
const cards = require("./cards.json");

// port used by the server
const PORT = 3001;

// change host to public ip or local host
const HOST = "localhost"

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

  // this is a testing method
  // works wiht Client component
  socket.on("send_message", (message) => {
    console.log("rooms ", socket.rooms);
    socket.emit("received_message", socket.rooms[1]);
  });

  socket.on("join-socket-room", (number) => {
    socket.join(parseInt(number));
    console.log("socket joined rooms ", socket.rooms);
  })

  socket.on("cliente-pedir-cartas", (data) =>{
    let roomIndex =  rooms.findIndex(x => x.id == data);

    let cartaARepartir = rooms[roomIndex].cardToDeal;
    let cartasPorJugador = (56 / rooms[roomIndex].playersCount)
    socket.emit("servidor-enviar-cartas", [shuffledCards.slice(cartaARepartir,(cartaARepartir + cartasPorJugador)), wellTop]);
    rooms[roomIndex].cardToDeal += (cartasPorJugador -1)
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
  })

  socket.on("guest-ready", (playerName, sessionPin) => {
    console.log("Player ", playerName, " is ready")
    socket.to(parseInt(sessionPin)).emit("new-guest-ready", playerName);
    socket.emit("new-guest-ready", playerName, sessionPin);
  })
  
  socket.on("announce_join", (sessionId) => {
    // sends the player list to everyone in the room so they can update their list
    let roomIndex = rooms.findIndex(x => x.id == sessionId);
    if (roomIndex > -1) {
      console.log("new_join_player to toom ", sessionId, " data room ", rooms[roomIndex]);
      console.log("new_join_player socket rooms ", socket.rooms);

      socket.to(parseInt(sessionId)).emit("new_join_player", rooms[roomIndex].players);
    }
  });

  socket.on("join_session", (playerName, sessionId) => {
    console.log(`${playerName} Trying to join session with number ${sessionId}`);
    let repeatedName = false;
    let roomIndex = -1;
    if (rooms.length > 0) {
      roomIndex = rooms.findIndex(x => x.id == sessionId);
      if (roomIndex > -1) {
        repeatedName = rooms[roomIndex].players.findIndex((x) => x == playerName) !== -1;
      } 
      console.log(`Join session: found room id (${rooms[0].id}) found at index ${roomIndex}`);
    }

    if (roomIndex != -1 && rooms[roomIndex].playersCount < 8 && repeatedName == false) {
      // we add the player name
      rooms[roomIndex].players.push(playerName);
      // player count increase wwith the join
      rooms[roomIndex].playersCount = rooms[roomIndex].players.length;

      // join the socket room to emit messages
      socket.join(parseInt(sessionId));
      console.log(`Joined session with number ${sessionId}`);
      console.log("Socket rooms: ", socket.rooms);
      console.log("sessionId received: ", sessionId, " data type ", typeof parseInt(sessionId));

      // sends permission to client to join
      socket.emit("join_validation", true, rooms[roomIndex].sessionName);
    } else {
      let denegationMessage = "";

      if (roomIndex == -1) {
        denegationMessage = `Room ${sessionId} not found`;
      } else if (rooms[roomIndex].playersCount >= 8) {
        denegationMessage = `Room ${sessionId} is full`;
      } else if ( repeatedName == true ) {
        denegationMessage = `There is already a player named ${playerName} in room ${sessionId}`;
      }

      console.log(`Not joined session with number ${sessionId}`);
      socket.emit("join_validation", false, denegationMessage);
    }
  })

  socket.on("start_game", (sessionId) => {
    console.log("Host started the game");
    console.log("sessionId received: ", sessionId, " data type ", typeof sessionId);
    console.log("Socket rooms: ", socket.rooms);
    socket.to(parseInt(sessionId)).emit("started_game", "useless");
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

  socket.on("restar-carta-jugador", (infoJugador) => {
    socket.to(parseInt(infoJugador.sessionPin)).emit("cambiar-cantidad-cartas", {name: infoJugador.name, cardsRemaining: infoJugador.cardsRemaining});
    socket.emit("cambiar-cantidad-cartas", {name: infoJugador.name, cardsRemaining: infoJugador.cardsRemaining});
  })

  socket.on("create_session", (hostName, sessionName) => {
    if (rooms.length > 0 && rooms.findIndex(x => x.id == sessionNumber) > -1) {
      console.log(`\n The room already exists room id ${rooms[0].id}`);
    } else {
      // creation of the room
      rooms.push({id : sessionNumber, sessionName : sessionName, playersCount : 1, cardToDeal : 1, winnerPlayer : "null", players: [hostName]});
      console.log(`\n create_session: rooms in rooms array: ${rooms}`);

      // server responds to client with yhe session number assigned
      socket.emit("room_id", sessionNumber);
      console.log(`Created session with number ${sessionNumber} \n`);

      ++sessionNumber;
    }
  })

});


server.listen(PORT, HOST, () => {
  console.log("Server running");
});
