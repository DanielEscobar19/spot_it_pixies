import React, {useEffect} from 'react'
import Layout from './Layout'
import './css/waitingRooms/waitingRoom.css'
import {useSearchParams} from 'react-router-dom';

export default function WaitingRoomHost() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    document.title = 'Waiting room - host';
  });

  return (
    <>
    <Layout/>
    {/* <!-- information about the session section --> */}
    <section class="container text-center">
      <div class="row my-5">
      
        <div class="col">
          <h1> 
            {/* <!-- TODO: Instead of "Session name", we must put the name given by the host" --> */}
            <span class="text-muted">The Well/</span>Session name
          </h1>
        </div>
      
      </div>
      
      {/* <!-- Row with player count, session pin and start button --> */}
      <div class="row align-items-end my-5">
        
        <div class="col justify-content-start">
          {/* <!-- Player count --> */}
          <div class="player-count-container box-container unselectable-text">
            <img src="../../img/common/plaza.png" alt="Player icon"/>
            {/* <!-- TODO: this number is calculated counting the number of player connected including the host --> */}
            <p>1</p>
          </div>
        </div>

        {/* <!-- Session pin --> */}
        <div class="col text-center d-flex flex-column justify-content-center align-items-center">
          <h2 class="unselectable-text">Session pin</h2>
          <div class="box-container mt-2">
            {/* <!-- TODO: The pin is generated automatically following a generation algorithm --> */}
            <p class="selectable-text-all">1234</p>
          </div>
        </div>
        
        {/* <!-- TODO: Start button. Is clickable if all players are ready  Disabled attribute is removed in this case--> */}
        <div class="col d-flex justify-content-end">
          <a type="button" class="btn btn-primary purple-background star-button" href="../gameRoom.html"> <p>Start</p></a>
        </div>
      
      </div>

    </section>

    {/* <!-- section with player names and status (waiting for players or ready) --> */}
    <section class="container">

      {/* <!-- Row with connected player names --> */}
      <div class="col d-flex text-center flex-row flex-wrap justify-content-center mb-5">
        
        {/* <!-- name of the host player --> */}
        <div  class="d-flex col-3 align-items-center justify-content-center" id="player-hostname-crown">
          <span class="p-0 badge bg-transparent">
            <img id="host-crown-icon" src="../../img/common/magic-crown.svg" alt="Crown icon"/>
          </span>
          <p class="mx-3 my-2 selectable-text-all" id="player-hostname">Hostname</p>
        </div>

        {/* <!-- TODO: connecion dot chages to class player-connected if it is connected, else it uses class player-disconnected --> */}
        {/* <!-- player with connection status dot --> */}
        <div class="d-flex col-3 align-items-center justify-content-center">
          <span class="bi bi-dot player-connected player-connection-dot unselectable-text "></span> 
          <p class=" ms-2 me-3 my-2 p-0 green-color selectable-text-all">playername</p>
        </div>
        {/* <!-- player with connection status dot --> */}
        <div class="d-flex col-3 align-items-center justify-content-center">
          <span class="bi bi-dot player-connected player-connection-dot unselectable-text "></span> 
          <p class=" ms-2 me-3 my-2 p-0 yellow-color selectable-text-all">playername</p>
        </div>
        {/* <!-- player with connection status dot --> */}
        <div class="d-flex col-3 align-items-center justify-content-center">
          <span class="bi bi-dot player-disconnected player-connection-dot unselectable-text "></span> 
          <p class=" ms-2 me-3 my-2 p-0 red-color cyan-color selectable-text-all">playername</p>
        </div>
        {/* <!-- player with connection status dot --> */}
        <div class="d-flex col-3 align-items-center justify-content-center">
          <span class="bi bi-dot player-disconnected player-connection-dot unselectable-text "></span> 
          <p class=" ms-2 me-3 my-2 p-0 dark-green-color selectable-text-all">playername</p>
        </div>
        {/* <!-- player with connection status dot --> */}
        <div class="d-flex col-3 align-items-center justify-content-center">
          <span class="bi bi-dot player-connected player-connection-dot unselectable-text "></span> 
          <p class=" ms-2 me-3 my-2 p-0 pink-color selectable-text-all">playername</p>
        </div>
        {/* <!-- player with connection status dot --> */}
        <div class="d-flex col-3 align-items-center justify-content-center">
          <span class="bi bi-dot player-disconnected player-connection-dot unselectable-text "></span> 
          <p class=" ms-2 me-3 my-2 p-0 orange-color selectable-text-all">playername</p>
        </div>
        {/* <!-- player with connection status dot --> */}
        <div class="d-flex col-3 align-items-center justify-content-center">
          <span class="bi bi-dot player-disconnected player-connection-dot unselectable-text "></span> 
          <p class=" ms-2 me-3 my-2 p-0 gray-color selectable-text-all">playername</p>
        </div>
      </div>

      {/* <!-- box indicating if we are still waiting for players --> */}
      {/* <!-- TODO: This text only appears if there is no player connected apart from the host --> */}
      <div class="col d-flex text-center justify-content-center">
        <section class="box-container">
          <h2 class="unselectable-text">Waiting for players...</h2>
        </section>
      </div>
    </section>
  </>
  )
}
