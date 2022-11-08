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
    origin: "http://localhost:3000",
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


io.on("connection", (socket) => {

  console.log(`User connected: ${socket.id}`);

  socket.on("cliente-pedir-cartas", () =>{
    socket.emit("servidor-enviar-cartas", [shuffledCards.slice(1,56), wellTop]);
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
      socket.broadcast.emit("cambio-top-well", wellTop);
    } else {
      socket.emit("acerto-simbolo", [false]);
    }

  })


  
  // End Testing
});


server.listen(3001, () => {
  console.log("Server running");
});
