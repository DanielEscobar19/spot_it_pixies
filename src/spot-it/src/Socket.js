import { io } from "socket.io-client";

// the socketClient object must be unique globally, and only instantiated once
export default io.connect(process.env.NODE_ENV === "production" ? "http://129.153.234.175:80" : "http://localhost:8080");