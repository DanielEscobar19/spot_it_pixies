import arrayShuffle from 'array-shuffle';
import React, {useEffect, useContext} from 'react'
import PlayerConnection from './PlayerConnection';
import { SocketContext } from '../context/socket';


export default function ConnectedPlayers({playersList, setPlayerList, sessionPin, playerId}) {
  const playersTextColors = ["red-color", "cyan-color", "pink-color", "orange-color", "gray-color", "dark-yellow-color", "green-color"];
  const socket = useContext(SocketContext);
  useEffect(() => {
    arrayShuffle(playersTextColors);
    socket.emit("get_players", sessionPin);
  }, [])

  useEffect(() => {
    socket.on("new_join_player" , (players) => {
      console.log("Received players ", players);
      updatePlayers(players);
    })

    socket.on("players_list", (players) => {
      console.log("Received players ", players);
      updatePlayers(players);
    })

    function updatePlayers(players) {
      let newList =  [...playersList];
      let playerType = "";
      console.log("players.length ", players.length);
      for(let i = 0; i < players.length; ++i) {
        if (newList.findIndex((x) => x.name == players[i]) < 0) {
          if (i > 0) {
            playerType = "player";
          } else {
            playerType = "host";
          }
          newList = [...newList, {type : playerType, name : players[i], isConnected : false, 
            id : ++playerId }];
        }
      }
      console.log("newList ", newList);
      setPlayerList([...newList]);
      console.log("playersList ", playersList);
    }
  }, [socket, playersList]);


  return (
    <div className="container w-75 d-flex justify-content-center mb-4">
        <div className="row d-flex text-center">
          {playersList.map((player, colorIndex) => {
              let color = "";
              player.type === "host" ? (color = "") : (color = playersTextColors[colorIndex-1]);

              console.log(`colorIndex ${colorIndex} color${color} `);
              return <PlayerConnection key={player.id} player={player} colorText={color}/>
            }
          )}
        </div>
    </div>
  )
}
