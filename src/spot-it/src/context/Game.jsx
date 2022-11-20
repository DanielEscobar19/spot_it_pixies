import { createContext } from "react";
import { useState, useEffect } from "react";
import socket from "../Socket";
import {v4} from 'uuid';

export const GameContext = createContext({
  players: [],
  setPlayers: (players) => {},
  host: "",
  setHost: (host) => {},
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
  playerCardsRemaining: [],
  setPlayerCardsRemaining: (players) => {},
  messagesList: [],
  setMessagesLis: (messagesList) => {},
  playersCount: 0,
  setPlayersCount: (playersCount) => {},
  readyCount: 1,
  setReadyCount: (readyCount) => {},
  readyList: [],
  setReadyList: (readyList) => {}
});

export function GameProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [host, setHost] = useState("");
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
  const[playerCardsRemaining, setPlayerCardsRemaining] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [playersCount, setPlayersCount] = useState([]);
  const [readyCount, setReadyCount] = useState([]);
  const [readyList, setReadyList] = useState([]);
  const context = {
    players,
    setPlayers,
    host,
    setHost,
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
    setFinalTime,
    playerCardsRemaining,
    setPlayerCardsRemaining,
    messagesList,
    setMessagesList,
    playersCount,
    readyCount,
    readyList,
    setReadyList
  };

  useEffect(() => {
    socket.on("new_join_player" , (newPlayers) => {
      setPlayers(newPlayers);
      setPlayersCount(playersCount + 1);
    })

    socket.on("players_list", (newPlayers, count) => {
      setPlayersCount(count);
      setPlayers(newPlayers);
    })

    socket.on("room_id", (newRoomId) => {
      setRoomId(newRoomId);
    })

    socket.on("reflectLeaderBoard", (counts, times) => {
      setWinCount(counts);
      setBestTime(times);
    })

    socket.on("join_validation", (canJoin, data, id, host) => {
      setCanJoin(canJoin);
      console.log("canJoin ", canJoin, " roomId:", id);
      if (canJoin === true) {
        setSessionName(data);
        setRoomId(id)
        setHost(host)
      } else {
        setErrorMessage(data);
      }
    })

    socket.on("cambiar-cantidad-cartas", (cardsData) => {
      
      setPlayerCardsRemaining(cardsData);
    });

    socket.on("new_host", (newHost) => {
      setHost(newHost);
    });

    socket.on("ready_list", (ready_list) => {
      let playersReady = 0;
      for(let i = 0; i < ready_list.length; i++){
        if(ready_list[i] === true) playersReady++;
      }
      setReadyCount(playersReady)
      setReadyList(ready_list);
      console.log("setting ready list", readyList, playersReady);
    });

    socket.on("new-event", (message) => {
      message.id = v4();
      setMessagesList([...messagesList, message]);
    })
  });

  return <GameContext.Provider value={context}>{children}</GameContext.Provider>;
}
    