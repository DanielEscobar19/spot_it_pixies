import '../css/waitingRooms/waitingRoom.scss'
import '../css/waitingRooms/guestRoom.css'

import React, { useContext } from 'react'
import WaitingRoomCommun from './WaitingRoomCommun';
import socket from "../Socket";
import  { GameContext } from '../context/Game'


export default function WaitingRoomGuest() {
  const { name, roomId } = useContext(GameContext);


  function clickReady () {
    console.log("I'm ready");
    socket.emit("guest_ready", roomId, name);
  }

  return (
    <>
      <WaitingRoomCommun onClick={clickReady}/>
      {/* <!-- box indicating if we for the host to start the game --> */}
      {/* <!-- This text only appears if there is no player connected apart from the host --> */}
      <div className="col d-flex text-center justify-content-center my-5 d-cursor pt-5">
        <section className="box-container py-3">
          <h1>
            Please wait
            <br />
            The session host will start game soon.
          </h1>
        </section>
        <img src="../../img/common/spot_it_hand.svg" alt="Spot it hand" className="hand-logo"/>
      </div>

      {/* <!-- inspirational quotes --> */}
      <div className="col d-flex text-center justify-content-center mb-5">
        <h3 className="quote">
          are you good? be better
          <br />
          -Sanderson
        </h3>
      </div>
    </>
  )
}

