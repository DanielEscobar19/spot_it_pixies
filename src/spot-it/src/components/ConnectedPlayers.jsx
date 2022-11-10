import arrayShuffle from 'array-shuffle';
import React, {useEffect, useContext} from 'react'
import PlayerConnection from './PlayerConnection';
import { SocketContext } from '../context/socket';


export default function ConnectedPlayers({playersList}) {
  const playersTextColors = ["red-color", "cyan-color", "pink-color", "orange-color", "gray-color", "dark-yellow-color", "green-color"];
  useEffect(() => {
    arrayShuffle(playersTextColors);
  }, [])

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
