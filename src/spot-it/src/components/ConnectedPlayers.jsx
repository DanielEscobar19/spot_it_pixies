import arrayShuffle from 'array-shuffle';
import React, { useEffect, useContext, useState } from 'react'
import PlayerConnection from './PlayerConnection';
import { SOCKET_URL } from '../context/socket';
import { io } from "socket.io-client";
import { useNavigate } from 'react-router';


export default function ConnectedPlayers({playersList, setPlayerList, playerId, sessionPin, sessionName, playerActual}) {
  const playersTextColors = ["red-color", "cyan-color", "pink-color", "orange-color", "gray-color", "dark-yellow-color", "green-color"];
  const socket = io.connect(SOCKET_URL);
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("join-socket-room", sessionPin);
    socket.emit("get_players", sessionPin);
    socket.emit("announce_join", sessionPin);
    arrayShuffle(playersTextColors);
  }, [])

  useEffect(() => {
    socket.emit("join-socket-room", sessionPin);
    socket.on("new_join_player" , (players) => {
      console.log("New_join_player Received players ", players);
      updatePlayers(players);
    })

    socket.on("players_list", (players) => {
      console.log("Players_list received players ", players);
      updatePlayers(players);
    })

    function updatePlayers(players) {

      let playerType = "guest";
      let tempList = playersList;
      players.forEach((element, index) => {
        if (tempList.findIndex((x) => x.name == element) == -1) {

          if (index == 0) {
            playerType = "host";
          } else {
            playerType = "guest";
          }
          tempList = [...tempList, {type : playerType, name : element, isConnected : false, 
            id : playerId++ }]};
        setPlayerList(tempList);
      });
    }

    socket.on("started_game", (useless) => {
      console.log("Game started");
      navigate("/game-room", {
        replace : true,
         state : { 
          playersConnected : playersList
          , actualPlayer : playerActual
          , sessionName : sessionName
          , sessionPin : sessionPin
      }})
    });
  }, [socket]);


  return (
    <div className="container w-75 d-flex justify-content-center mb-4">
        <div className="row d-flex text-center">
          {
            playersList.map((player, colorIndex=0) => {
                let color = "";
                player.type === "host" ? (color = "purple-color") : (color = playersTextColors[colorIndex++]);
  
                console.log(`colorIndex ${colorIndex} color${color} `);
  
                return <PlayerConnection key={player.name} player={player} colorText={color}/>
              }
            )
          }
        </div>
    </div>
  )
}
