import React, { createContext } from "react";
import io from "socket.io-client";

export const SOCKET_URL = "http://localhost:3001";
export const socket = io.connect(SOCKET_URL);
export const SocketContext = React.createContext();