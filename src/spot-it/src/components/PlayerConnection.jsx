import React, {useRef, useState} from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../css/waitingRooms/waitingRoom.scss'

export default function PlayerConnection({player, colorText, host}) {
  const idRef = useRef(null)
  const [isConnected, setIsConnected] = useState();
  console.log(host, player);

  return (
    <>
      <div ref={idRef} className="d-flex col-md align-items-center justify-content-center">
        { host ? (
            <span className="p-0 mb-2 badge bg-transparent">
              <img id="host-crown-icon"  src="../../img/common/magic-crown.svg" alt="Crown icon"/>
            </span>
          ) : (
            <span id="foo" className={`${isConnected === true ? "player-connected" : "player-disconnected"} bi bi-dot player-connection-dot unselectable-text`}></span>
          )
        }
        <p className={`mx-3 my-2 selectable-text-all ${colorText}`}>{player} {}</p>
      </div>
    </>
  )
}
