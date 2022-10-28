import './css/waitingRooms/waitingRoom.css'

import React, {useEffect} from 'react'
import Layout from './Layout'
import {useSearchParams} from 'react-router-dom';

export default function WaitingRoomHost() {
  const [searchParams, ] = useSearchParams();
  useEffect(() => {
    document.title = 'Spot it - Waiting room - host';
  });

  console.log( "\n\nsession-pin received " + searchParams.get("session-pin"));
  console.log( "session-name received " + searchParams.get("session-name"));
  console.log( "host-name received " + searchParams.get("host-name"));


  return (
    <>
    <Layout/>
    {/* <!-- information about the session section --> */}
    <section className="container text-center">
      <div className="row my-5">
      
        <div className="col">
          <h1> 
            {/* <!-- TODO: Instead of "Session name", we must put the name given by the host" --> */}
            <span className="text-muted">The Well/</span>{searchParams.get("session-name")}
          </h1>
        </div>
      
      </div>
      
      {/* <!-- Row with player count, session pin and start button --> */}
      <div className="row align-items-end my-5">
        
        <div className="col justify-content-start">
          {/* <!-- Player count --> */}
          <div className="player-count-container box-container unselectable-text">
            <img src="../../img/common/plaza.png" alt="Player icon"/>
            {/* <!-- TODO: this number is calculated counting the number of player connected including the host --> */}
            <p>1</p>
          </div>
        </div>

        {/* <!-- Session pin --> */}
        <div className="col text-center d-flex flex-column justify-content-center align-items-center">
          <h2 className="unselectable-text">Session pin</h2>
          <div className="box-container mt-2">
            {/* <!-- TODO: The pin is generated automatically following a generation algorithm --> */}
            <p className="selectable-text-all">{searchParams.get("session-pin")}</p>
          </div>
        </div>
        
        {/* <!-- TODO: Start button. Is clickable if all players are ready  Disabled attribute is removed in this case--> */}
        <div className="col d-flex justify-content-end">
          <a type="button" className="btn btn-primary purple-background star-button" href="../gameRoom.html"> <p>Start</p></a>
        </div>
      
      </div>

    </section>

    {/* <!-- section with player names and status (waiting for players or ready) --> */}
    <section className="container">

      {/* <!-- Row with connected player names --> */}
      <div className="col d-flex text-center flex-row flex-wrap justify-content-center mb-5">
        
        {/* <!-- name of the host player --> */}
        <div  className="d-flex col-3 align-items-center justify-content-center" id="player-hostname-crown">
          <span className="p-0 badge bg-transparent">
            <img id="host-crown-icon" src="../../img/common/magic-crown.svg" alt="Crown icon"/>
          </span>
          <p className="mx-3 my-2 selectable-text-all" id="player-hostname">{searchParams.get("host-name")}</p>
        </div>

        {/* <!-- TODO: connecion dot chages to class player-connected if it is connected, else it uses class player-disconnected --> */}
        {/* <!-- player with connection status dot --> */}
        <div className="d-flex col-3 align-items-center justify-content-center">
          <span className="bi bi-dot player-connected player-connection-dot unselectable-text "></span> 
          <p className=" ms-2 me-3 my-2 p-0 green-color selectable-text-all">playername</p>
        </div>
        {/* <!-- player with connection status dot --> */}
        <div className="d-flex col-3 align-items-center justify-content-center">
          <span className="bi bi-dot player-connected player-connection-dot unselectable-text "></span> 
          <p className=" ms-2 me-3 my-2 p-0 yellow-color selectable-text-all">playername</p>
        </div>
        {/* <!-- player with connection status dot --> */}
        <div className="d-flex col-3 align-items-center justify-content-center">
          <span className="bi bi-dot player-disconnected player-connection-dot unselectable-text "></span> 
          <p className=" ms-2 me-3 my-2 p-0 red-color cyan-color selectable-text-all">playername</p>
        </div>
        {/* <!-- player with connection status dot --> */}
        <div className="d-flex col-3 align-items-center justify-content-center">
          <span className="bi bi-dot player-disconnected player-connection-dot unselectable-text "></span> 
          <p className=" ms-2 me-3 my-2 p-0 dark-green-color selectable-text-all">playername</p>
        </div>
        {/* <!-- player with connection status dot --> */}
        <div className="d-flex col-3 align-items-center justify-content-center">
          <span className="bi bi-dot player-connected player-connection-dot unselectable-text "></span> 
          <p className=" ms-2 me-3 my-2 p-0 pink-color selectable-text-all">playername</p>
        </div>
        {/* <!-- player with connection status dot --> */}
        <div className="d-flex col-3 align-items-center justify-content-center">
          <span className="bi bi-dot player-disconnected player-connection-dot unselectable-text "></span> 
          <p className=" ms-2 me-3 my-2 p-0 orange-color selectable-text-all">playername</p>
        </div>
        {/* <!-- player with connection status dot --> */}
        <div className="d-flex col-3 align-items-center justify-content-center">
          <span className="bi bi-dot player-disconnected player-connection-dot unselectable-text "></span> 
          <p className=" ms-2 me-3 my-2 p-0 gray-color selectable-text-all">playername</p>
        </div>
      </div>

      {/* <!-- box indicating if we are still waiting for players --> */}
      {/* <!-- TODO: This text only appears if there is no player connected apart from the host --> */}
      <div className="col d-flex text-center justify-content-center">
        <section className="box-container">
          <h2 className="unselectable-text">Waiting for players...</h2>
        </section>
      </div>
    </section>
  </>
  )
}
