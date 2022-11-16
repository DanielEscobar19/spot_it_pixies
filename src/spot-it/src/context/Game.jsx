import { createContext } from "react";
import { useState, useEffect } from "react";
import socket from "../Socket";

export const GameContext = createContext({
  players: [],
  setPlayers: (players) => {},
  isHost: false,
  setIsHost: (isHost) => {},
  name: "",
  setName: (name) => {},
  ganador: "",
  setGanador: (ganador) => {},
  roomId: "",
  setRoomId: (roomId) => {},
  sessionName: "",
  setSessionName: (sessionName) => {},
  isTyping: false,
  setIsTyping: (isTyping) => {},
  canJoin: false,
  setCanJoin: (canJoin) => {},
  errorMessage: "",
  setErrorMessage: (errorMessage) => {},
  winCount: new Array(8).fill(0),
  setWinCount: (winCount) => {},
  bestTime: new Array(8).fill(0),
  setBestTime: (bestTime) => {},
  finalTime: 0,
  setFinalTime: (finalTime) => {},
});

export function GameProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [name, setName] = useState("");
  const [ganador, setGanador] = useState("");
  const [roomId, setRoomId] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [canJoin, setCanJoin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [winCount, setWinCount] = useState([]);
  const [bestTime, setBestTime] = useState([]);
  const [finalTime, setFinalTime] = useState(0);
  const context = {
    players,
    setPlayers,
    isHost,
    setIsHost,
    roomId,
    setRoomId,
    sessionName,
    setSessionName,
    name,
    setName,
    ganador,
    setGanador,
    isTyping,
    setIsTyping,
    canJoin,
    setCanJoin,
    errorMessage,
    setErrorMessage,
    winCount,
    setWinCount,
    bestTime,
    setBestTime,
    finalTime,
    setFinalTime
  };

  useEffect(() => {
    socket.on("new_join_player" , (newPlayers) => {
      console.log("New_join_player Received players ", newPlayers);
      updatePlayers(newPlayers);
    })

    socket.on("players_list", (newPlayers) => {
      console.log("Players_list received players ", newPlayers);
      updatePlayers(newPlayers);
    })

    socket.on("room_id", (newRoomId) => {
      setPlayers([]);
      setRoomId(newRoomId);
    })

    socket.on("reflectLeaderBoard", (counts, times) => {
      setWinCount(counts);
      setBestTime(times);
    })

    socket.on("join_validation", (canJoin, data, id) => {
      setCanJoin(canJoin);
      console.log("canJoin ", canJoin, " roomId:", id);
      if (canJoin === true) {
        setSessionName(data);
        setRoomId(id)

      } else {
        setErrorMessage(data);
      }
    })

    function updatePlayers(newPlayers) {

      let playerType = "guest";
      let tempList = players;
      let playerId = 0;
      newPlayers.forEach((element, index) => {
        if (tempList.findIndex((x) => x.name === element) === -1) {

          if (index === 0) {
            playerType = "host";
          }
          tempList = [...tempList, {type : playerType, name : element, isConnected : false, id : playerId++ }]};
          setPlayers(tempList);
      });
    }
  });

  return <GameContext.Provider value={context}>{children}</GameContext.Provider>;
}
    