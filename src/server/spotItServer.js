const { Server } = require("net");
const { parse } = require("path");

const server = new Server();
server.listen({port:8000, host: "0.0.0.0"}, () => { console.log("Listening on port ", server.address.port);
});

server.on("data", (data) => {
});
