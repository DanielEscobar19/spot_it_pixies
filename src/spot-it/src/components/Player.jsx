import React, {useEffect, useRef} from 'react'
import '../css/waitingRooms/waitingRoom.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'


export default function Player({player, colorText}) {
  const idRef = useRef(null)
  const playerNameRef = useRef(null);
  const connectionDot = useRef(null);
  const crownBadge = useRef(null);


  function assignConnectionDot() {
    if (player.isConnected === true) {
      connectionDot.current.classList.add("player-connected");
    } else {
      connectionDot.current.classList.add("player-disconnected");
    }
  }

  function assignClassesToPlayer() {
    if(player.type === "host"){
      idRef.current.id = "player-hostname-crown";
      playerNameRef.current.id = "player-hostname";
      connectionDot.current.classList.add("d-none");
    } else {
      crownBadge.current.classList.add("d-none");
    }
    console.log(`color [${colorText}] sdasd`)
    if (colorText !== "") {
      playerNameRef.current.classList.add(colorText);  
    }
  }

  useEffect(() => {
    assignClassesToPlayer();
    assignConnectionDot();
  });
  
  return (
    <>
      <div ref={idRef} className="d-flex col-md align-items-center justify-content-center">
        <span ref={crownBadge} className="p-0 mb-2 badge bg-transparent">
          <img id="host-crown-icon" src="../../img/common/magic-crown.svg" alt="Crown icon"/>
        </span>
        <span ref={connectionDot} id="foo" className="bi bi-dot player-connection-dot unselectable-text"></span>
        <p className="mx-3 my-2 selectable-text-all" ref={playerNameRef}>{player.name}</p>
      </div>
    </>
  )
}
