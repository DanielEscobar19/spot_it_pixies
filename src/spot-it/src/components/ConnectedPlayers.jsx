import arrayShuffle from 'array-shuffle';
import React, {useEffect, useContext} from 'react'
import PlayerConnection from './PlayerConnection';
import { SocketContext } from '../context/socket';


export default function ConnectedPlayers({playersList, setPlayerList, sessionPin, playerId, setPlayerId}) {
  const playersTextColors = ["red-color", "cyan-color", "pink-color", "orange-color", "gray-color", "dark-yellow-color", "green-color"];
  const socket = useContext(SocketContext);
  useEffect(() => {
    arrayShuffle(playersTextColors);
    socket.emit("get_players", sessionPin);
  }, [])

  useEffect(() => {
    socket.on("new_join_player" , (players) => {
      updatePlayers(players);
    })

    socket.on("players_list", (players) => {
      updatePlayers(players);
    })

    function updatePlayers(players) {
      let newList =  [...playersList];
      let playerType = "";
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
      setPlayerList(newList);
      console.log(playersList);
    }
  }, [socket]);


  return (
    <div className="container w-75 d-flex justify-content-center mb-4">
        <div className="row d-flex text-center">
          {playersList.map((player, colorIndex) => {
              let color = "";
              player.type === "host" ? (color = "") : (color = playersTextColors[colorIndex-1]);

              // TODO: create unique key. The name of the player can be repeated
              console.log(`colorIndex ${colorIndex} color${color} `);
              return <PlayerConnection key={player.id} player={player} colorText={color}/>
            }
          )}
        </div>
    </div>
  )
}
