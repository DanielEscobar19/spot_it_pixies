import React, {useEffect, useRef, useState} from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../css/waitingRooms/waitingRoom.scss'

export default function PlayerConnection({player, colorText, host, sessionPin}) {
  const idRef = useRef(null)
  const playerNameRef = useRef(null);
  const connectionDot = useRef(null);
  const crownBadge = useRef(null);
  const [isConnected, setIsConnected] = useState();

  function assignClassesToPlayer() {
    if(host){
      idRef.current.id = "player-hostname-crown";
      playerNameRef.current.id = "player-hostname";
      connectionDot.current.classList.add("d-none");
    } else {
      crownBadge.current.classList.add("d-none");
    }
    console.log(`color assigned [${colorText}]`)
    if (colorText !== "") {
      // playerNameRef.current.classList.add(colorText);  
    }
  }

  useEffect(() => {
    assignClassesToPlayer();
  });

  return (
    <>
      <div ref={idRef} className="d-flex col-md align-items-center justify-content-center">
        <span ref={crownBadge} className="p-0 mb-2 badge bg-transparent">
          <img id="host-crown-icon" src="../../img/common/magic-crown.svg" alt="Crown icon"/>
        </span>
        <span ref={connectionDot} id="foo" className={`${isConnected === true ? "player-connected" : "player-disconnected"} bi bi-dot player-connection-dot unselectable-text`}></span>
        <p className={`mx-3 my-2 selectable-text-all ${colorText}`} ref={playerNameRef}>{player.name} {}</p>
      </div>
    </>
  )
}
