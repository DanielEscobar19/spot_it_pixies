import arrayShuffle from 'array-shuffle';
import React, { useEffect, useContext, useState } from 'react'
import PlayerConnection from './PlayerConnection';
import { SOCKET_URL } from '../context/socket';
import { io } from "socket.io-client";


export default function ConnectedPlayers({playersList, setPlayerList, playerId, sessionPin}) {
  const playersTextColors = ["red-color", "cyan-color", "pink-color", "orange-color", "gray-color", "dark-yellow-color", "green-color"];
  const socket = io.connect(SOCKET_URL);

  useEffect(() => {
    socket.emit("join-socket-room", sessionPin);
    socket.emit("get_players", sessionPin);
    socket.emit("announce_join", sessionPin);
    arrayShuffle(playersTextColors);
  }, [])

  useEffect(() => {
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

    return () => {

    }
  }, [socket]);

  return (
    <div className="container w-75 d-flex justify-content-center mb-4">
        <div className="row d-flex text-center">
          {playersList.map((player, colorIndex) => {
              let color = "";
              player.type === "host" ? (color = "purple-color") : (color = playersTextColors[colorIndex-1]);

              console.log(`colorIndex ${colorIndex} color${color} `);
              return <PlayerConnection key={player.name} player={player} colorText={color}/>
            }
          )}
        </div>
    </div>
  )
}
