import React from 'react'

export default function LeaderBoardPlayer({player}) {
  return (
    <div className="tarjeta-nombres">
        <div className="nombre-jugador">
            <p className="h6">{player.name}</p>
        </div>
        <div className="numero-jugador">
          <p className="h6">{player.cardsRemaining}</p>
        </div>
    </div>
  )
}
