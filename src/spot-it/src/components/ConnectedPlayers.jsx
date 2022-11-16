import arrayShuffle from 'array-shuffle';
import { useEffect, useContext } from 'react';
import PlayerConnection from './PlayerConnection';
import { useNavigate } from 'react-router';
import socket from "../Socket";
import  { GameContext } from '../context/Game'


export default function ConnectedPlayers({playersList, setPlayerList, playerId, sessionPin, sessionName, playerActual}) {
  const { players } = useContext(GameContext);
  const playersTextColors = ["red-color", "cyan-color", "pink-color", "orange-color", "gray-color", "dark-yellow-color", "green-color"];
  const navigate = useNavigate();

  useEffect(() => {
    // socket.emit("join-socket-room", sessionPin);
    socket.emit("get_players", sessionPin);
    socket.emit("announce_join", sessionPin);
    arrayShuffle(playersTextColors);
  }, [])

  useEffect(() => {
    socket.on("started_game", () => {
      console.log("Game started");
      navigate("/game-room");
    });
  });

  useEffect(() => {
    console.log("update playersList ", players);
  }, [players])

  return (
    <div className="container w-75 d-flex justify-content-center mb-4">
        <div className="row d-flex text-center">
          {
            players.map((player, index) => {
                const isHost = index === 0;
                let color = "";
                isHost ? (color = "purple-color") : (color = playersTextColors[index]);
  
                console.log(`colorIndex ${index} color${color} `);
  
                return <PlayerConnection key={player.name} player={player} colorText={color} host={isHost} sessionPin={sessionPin}/>
              }
            )
          }
        </div>
    </div>
  )
}
