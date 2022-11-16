import React from 'react'
import { useEffect, useState } from 'react'
import socket from "../Socket";

export default function InGameLeaderBoardPlayer({player, sessionPin}) {
  const[playerCardsRemaining, setPlayerCardsRemaining] = useState(player.cardsRemaining);

  useEffect(() => {
    socket.emit("join-socket-room", sessionPin);
  },[]);

  useEffect(()=>{
    socket.on("cambiar-cantidad-cartas", (playerData) => {
      if (playerData.name === player.name) {
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
