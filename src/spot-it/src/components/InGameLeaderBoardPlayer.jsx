import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { SOCKET_URL, SocketContext } from '../context/socket';
import io from 'socket.io-client';



export default function InGameLeaderBoardPlayer({player, sessionPin}) {
  const socket = useContext(SocketContext);
  const[playerCardsRemaining, setPlayerCardsRemaining] = useState(player.cardsRemaining);

  useEffect(() => {
    socket.emit("join-socket-room", sessionPin);
  },[]);

  useEffect(()=>{
    socket.on("cambiar-cantidad-cartas", (playerData) => {
      if (playerData.name == player.name) {
        setPlayerCardsRemaining(playerData.cardsRemaining);
      }
    });
  });

  return (
    <div className="tarjeta-nombres unselectable-text">
        <div className="nombre-jugador">
            <p className="h6">{player.name}</p>
        </div>
        <div className="numero-jugador">
          <p className="h6">{playerCardsRemaining}</p>
        </div>
    </div>
  )
}
