const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");
const cards = require("./cards.json");
// port used by the server
const PORT = 8080;

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
};

function shuffleCards (cartas) {
  let unshuffledCards = cartas;
  for (let i = 0; i < unshuffledCards.length; i += 1) {
      unshuffledCards[i].simbolos = arrayShuffle(unshuffledCards[i].simbolos);
  }
  return arrayShuffle(unshuffledCards);
};

let sessionNumber = 100;

let rooms = [];

function findRoom (sessionId) {
  let roomIndex =  rooms.findIndex(x => x.id == sessionId);
  if (roomIndex > -1) return rooms[roomIndex];
  return null;
}

io.on("connection", (socket) => {

  console.log(`User connected: ${socket.id}`);

  // this is a testing method
  // works wiht Client component
  socket.on("send_message", (message) => {
    console.log("rooms ", socket.rooms);
    socket.emit("received_message", socket.rooms[1]);
  });

  socket.on("send-new-event", (roomId, message) => {
    socket.to(parseInt(roomId)).emit("new-event", message);
    socket.emit("new-event", message);
  });

  socket.on("join-socket-room", (number) => {
    socket.join(parseInt(number));
    console.log("socket joined rooms ", socket.rooms, " number: ", number);
  })

  socket.on("cliente-pedir-cartas", (data, playerName) =>{
    let room = findRoom(data);
    if(room){
      let cartaARepartir = room.cardToDeal;
      let cartasPorJugador = (56 / room.playersCount);
      // room.cantidadCartas.fill(cartasPorJugador);

      let playerCardsArray = shuffledCards.slice(cartaARepartir,(cartaARepartir + cartasPorJugador));
      let actualPlayerIndex = room.players.findIndex(x => x == playerName);
      room.cantidadCartas[actualPlayerIndex] = playerCardsArray.length;
      console.log("Array despues de asignar ",   room.cantidadCartas);

      socket.to(parseInt(data)).emit("cambiar-cantidad-cartas", room.cantidadCartas);
      socket.emit("cambiar-cantidad-cartas", room.cantidadCartas);


      socket.emit("servidor-enviar-cartas", [playerCardsArray, wellTop]);
      room.cardToDeal += (cartasPorJugador -1)
    }
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
      socket.to(parseInt(data.sessionPin)).emit("new-event", {playerName: data.name, content: "Spotted the correct symbol!"});
      socket.emit("new-event", {playerName: data.name, content: "Spotted the correct symbol!"});
      wellTop = data.carta;
      socket.to(parseInt(data.sessionPin)).emit("cambio-top-well", wellTop);
      if (data.cantidadCartas == 1) {
        socket.to(parseInt(data.sessionPin)).emit("hay-ganador", true, data.name);
        socket.emit("hay-ganador", true, data.name);
      }
    } else {
      socket.emit("acerto-simbolo", [false]);
    }
  })
  
  socket.on("announce_join", (sessionId) => {
    // sends the player list to everyone in the room so they can update their list
    let room = findRoom(sessionId);
    if (room) {
      console.log("new_join_player to room ", sessionId, " data room ", room);
      socket.to(parseInt(sessionId)).emit("new_join_player", room.players);
      socket.to(parseInt(sessionId)).emit("ready_list", room.ready);
    }
  });

  socket.on("join_session", (playerName, sessionId) => {
    console.log(`${playerName} Trying to join session with number ${sessionId}`);
    let repeatedName = false;
    let denegationMessage = "";
    let room = findRoom(sessionId);
    if (room) {
      repeatedName = room.players.indexOf(playerName) !== -1;
      freeSpot = room.players.indexOf('');
      if (room.playersCount < 8 && repeatedName == false) {
        // we add the player name
        room.players[freeSpot] = playerName;
        // player count increase wwith the join
        room.playersCount += 1;
  
        // join the socket room to emit messages
        socket.join(parseInt(sessionId));
        console.log(`Joined session with number ${sessionId}`);
        console.log("Socket rooms: ", socket.rooms);
        console.log("sessionId received: ", sessionId, " data type ", typeof parseInt(sessionId));
  
        // sends permission to client to join
        socket.emit("join_validation", true, room.sessionName, sessionId, room.hostName);
        socket.emit("ready_list", room.ready);
      }
      if (room.playersCount >= 8) {
        denegationMessage += `Room ${sessionId} is full `;
      }
      if ( repeatedName == true ) {
        denegationMessage += `There is already a player named ${playerName} in room ${sessionId} `;
      }
    } else {
      denegationMessage += `Room ${sessionId} not found`;
    }
    if (denegationMessage.length > 0){
      console.log(`Not joined session with number ${sessionId}`);
      socket.emit("join_validation", false, denegationMessage);
    }
  });

  socket.on("start_game", (sessionId) => {
    let room = findRoom(sessionId);
    let playersReady = 0;
    room.ready.forEach(e => {
      if(e) playersReady++;
    });
    if(playersReady === room.playersCount){
      room.cardToDeal = 1;
      console.log("Host started the game");
      console.log("sessionId received: ", sessionId, " data type ", typeof sessionId);
      console.log("Socket rooms: ", socket.rooms);
      socket.to(parseInt(sessionId)).emit("started_game", "useless");
    }
  });

  socket.on("get_players", (sessionId) => {
    let room = findRoom(sessionId);
    if (room) {
      socket.emit("players_list", room.players, room.playersCount);
    }
  });

  socket.on("guest_ready", (sessionId, name) => {
    let room = findRoom(sessionId);
    if (room) {
      index = room.players.indexOf(name);
      room.ready[index] = true;
      socket.emit("ready_list", room.ready);
      socket.to(parseInt(sessionId)).emit("ready_list", room.ready);
    }
  });

  socket.on("restar-carta-jugador", (sessionId, name, cantidadCartas) => {
    let room = findRoom(sessionId);
    if(room) {
      index = room.players.indexOf(name);
      room.cantidadCartas[index] = cantidadCartas;
      socket.to(parseInt(sessionId)).emit("cambiar-cantidad-cartas", room.cantidadCartas);
      socket.emit("cambiar-cantidad-cartas", room.cantidadCartas);
    }
  })

  socket.on("abandon_game", (name, sessionId) => {
    let room = findRoom(sessionId);
    let index = -1;
    if (room) {
      index = room.players.indexOf(name);
      room.bestTime[index] = 0;
      room.winCount[index] = 0;
      room.players[index] = '';
      room.ready[index] = false;
      room.playersCount -= 1;
      socket.to(parseInt(sessionId)).emit("reflectLeaderBoard", room.winCount, room.bestTime);
      socket.to(parseInt(sessionId)).emit("players_list", room.players, room.playersCount);
      socket.to(parseInt(sessionId)).emit("ready_list", room.ready);
      if (name === room.hostName){
        room.hostName = room.players.find( x => x.length > 0);
        index = room.players.indexOf(room.hostName);
        room.ready[index] = true;
        socket.to(parseInt(sessionId)).emit("new_host", room.hostName);
      }
      socket.leave(parseInt(sessionId));
      // borrar el room si esta con 0 jugadores?
      let roomIndex = rooms.findIndex(x => x.id == sessionId);
      console.log("Room a borrar  index", roomIndex , " lista de rooms: ",rooms);

      if (room.playersCount < 1) {
        rooms.splice(roomIndex, 1);
        console.log("Elimna el room ", rooms);
      }
    }
  });

  socket.on("updateLeaderBoard", (name, winTime, sessionId) => {
    const time = parseInt(winTime);
    let room  = findRoom(sessionId);
    let index = -1;
    if (room) {
      index = room.players.indexOf(name);
      if (index > -1) {
        room.winCount[index]++;
        if (room.bestTime[index] > time || room.bestTime[index] === 0) {
          room.bestTime[index] = time;
        }
      }
      console.log("updateLeaderBoard to room ", sessionId, " data room ", room);
      socket.emit("reflectLeaderBoard", room.winCount, room.bestTime);
      socket.to(parseInt(sessionId)).emit("reflectLeaderBoard", room.winCount, room.bestTime);
    }
  })

  socket.on("create_session", (hostName, sessionName) => {
    console.log("aqui");
    // creation of the room
    let room = {
      id : sessionNumber,
      sessionName : sessionName,
      hostName: hostName,
      playersCount : 1,
      cardToDeal : 1,
      lastWinner : "null",
      players: new Array(8).fill(""),
      ready: new Array(8).fill(false),
      winCount: new Array(8).fill(0),
      bestTime: new Array(8).fill(0),
      cantidadCartas: new Array(8).fill(0),
      };
    room.players[0] = hostName;
    room.ready[0] = true;
    rooms.push(room);
    console.log(`\n create_session: rooms in rooms array: ${rooms}`);
    // server responds to client with yhe session number assigned
    socket.emit("room_id", sessionNumber);
    socket.emit("ready_list", room.ready);
    console.log(`Created session with number ${sessionNumber} \n`);
    ++sessionNumber;
  });
});

server.listen(PORT, HOST, () => {
  console.log("Server running");
});
