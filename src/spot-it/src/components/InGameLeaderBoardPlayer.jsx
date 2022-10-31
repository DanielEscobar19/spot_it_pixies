import React from 'react'

export default function InGameLeaderBoardPlayer({player}) {
  return (
    <div className="tarjeta-nombres unselectable-text">
        <div className="nombre-jugador">
            <p className="h6">{player.name}</p>
        </div>
        <div className="numero-jugador">
          <p className="h6">{player.cardsRemaining}</p>
        </div>
    </div>
  )
}
