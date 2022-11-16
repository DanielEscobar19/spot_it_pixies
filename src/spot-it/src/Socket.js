import { io } from "socket.io-client";

// the socketClient object must be unique globally, and only instantiated once
export default io.connect(process.env.NODE_ENV === "production" ? "http://192.168.68.34:8080" : "http://localhost:8080");