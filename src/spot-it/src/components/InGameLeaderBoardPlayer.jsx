import React from 'react'
import "../css/components/inGameLeaberboard.scss"

export default function InGameLeaderBoardPlayer({name, cards}) {
  return (
    <div className="tarjeta-nombres unselectable-text">
        <div className="nombre-jugador">
            <p className="h6">{name}</p>
        </div>
        <div className="numero-jugador">
          <p className="h6">{cards}</p>
        </div>
    </div>
  )
}
