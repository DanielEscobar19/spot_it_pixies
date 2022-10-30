import arrayShuffle from 'array-shuffle';
import React, {useEffect} from 'react'
import Player from './Player';


export default function ConnectedPlayers({playerList, setPlayerList}) {
  const playersTextColors = ["red-color", "cyan-color", "pink-color", "orange-color", "gray-color", "dark-yellow-color", "green-color"];
  useEffect(() => {
    arrayShuffle(playersTextColors);
  })

  return (
    <div className="container w-75 d-flex justify-content-center mb-4">
        <div className="row d-flex text-center">
          {playerList.map((player, colorIndex) => {
              let color = "";
              player.type === "host" ? (color = "") : (color = playersTextColors[colorIndex-1]);

              // TODO: create unique key. The name of the player can be repeated
              console.log(`colorIndex ${colorIndex} color${color} `);
              return <Player key={player.name} player={player} colorText={color}/>
            }
          )}
        </div>
    </div>
  )
}
