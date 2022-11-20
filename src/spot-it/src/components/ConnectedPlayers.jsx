import arrayShuffle from 'array-shuffle';
import { useEffect, useContext } from 'react';
import PlayerConnection from './PlayerConnection';
import { useNavigate } from 'react-router';
import socket from "../Socket";
import  { GameContext } from '../context/Game'


export default function ConnectedPlayers() {
  const { players, host, roomId, readyList } = useContext(GameContext);
  const playersTextColors = ["red-color", "cyan-color", "pink-color", "orange-color", "gray-color", "dark-yellow-color", "green-color"];
  const navigate = useNavigate();
  const filteredPlayers = players.filter( x => x !== "")
  console.log(filteredPlayers);

  useEffect(() => {
    // socket.emit("join-socket-room", sessionPin);
    socket.emit("get_players", roomId);
    socket.emit("announce_join", roomId);
    arrayShuffle(playersTextColors);
  }, [])

  useEffect(() => {
    socket.on("started_game", () => {
      console.log("Game started");
      navigate("/game-room");
    });
  });

  return (
    <div className="container w-75 d-flex justify-content-center mb-4">
        <div className="row d-flex text-center">
          {
            filteredPlayers.map((player, index) => {
              const isHost = player === host;
              let idx = players.indexOf(player);
              let color = "";
              isHost ? (color = "purple-color") : (color = playersTextColors[index]);
              console.log(`colorIndex ${index} color${color} `);
              return <PlayerConnection key={index} player={player} colorText={color} host={isHost} ready={readyList[idx]} />
            })
          }
        </div>
    </div>
  )
}
