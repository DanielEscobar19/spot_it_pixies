import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../css/waitingRooms/waitingRoom.scss'

export default function PlayerConnection({player, colorText, host, ready}) {

  return (
    <>
      <div className="d-flex col-md align-items-center justify-content-center">
        { host ? (
            <span className="p-0 mb-2 badge bg-transparent">
              <img id="host-crown-icon"  src="../../img/common/magic-crown.svg" alt="Crown icon"/>
            </span>
          ) : (
            <span id="foo" className={`${ready === true ? "player-connected" : "player-disconnected"} bi bi-dot player-connection-dot unselectable-text`}></span>
          )
        }
        <p className={`mx-3 my-2 selectable-text-all ${colorText}`}>{player} {}</p>
      </div>
    </>
  )
}
