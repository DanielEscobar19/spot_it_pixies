import '../css/waitingRooms/waitingRoom.scss'

import React, {useEffect, useState} from 'react'
import {useSearchParams, Link} from 'react-router-dom';

import Layout from './Layout'
import Button from '../components/Button';
import ConnectedPlayers from '../components/ConnectedPlayers';
import io from "socket.io-client";

export default function WaitingRoomHost() {
  const socket = io.connect("http://localhost:3001");

  const [searchParams, ] = useSearchParams();
  useEffect(() => {
    document.title = 'Spot it - Waiting room - host';
  });

  
  console.log( "\n\nsession-pin received " + searchParams.get("session-pin"));
  console.log( "session-name received " + searchParams.get("session-name"));
  console.log( "host-name received " + searchParams.get("host-name"));
  let playerId = 0;
  
  // TODO: add the new connected players. This logic is managed through sockets
  const [playersList,setPlayerList] = useState([{type: "host", name : searchParams.get("host-name"), isConnected : true, id: playerId++}]);

  useEffect(() => {
    socket.on("new_join_player" , (newPlayer) => {
      playersList.push({type : "player", name : newPlayer, isConnected : true, id : playerId++});
      alert("Nuevooo");
    })
  }, [socket, playersList, playerId]);
  
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
        <div className="col d-flex justify-content-center">
          <Link replace={true} state={{playersConnected : playersList, actualPlayer : playersList[0], sessionName : searchParams.get("session-name"), sessionPin : searchParams.get("session-pin")}} to={{
            pathname: "/game-room",
           }}> 
            <Button title="Start" /> 
          </Link>
        </div>
      </div>

    </section>

    <ConnectedPlayers playerList={playersList} setPlayerList={setPlayerList}/>
    {/* <!-- box indicating if we are still waiting for players --> */}
    {/* <!-- TODO: This text only appears if there is no player connected apart from the host --> */}
    <div className="col d-flex text-center justify-content-center">
      <section className="box-container">
        <h2 className="unselectable-text">Waiting for players...</h2>
      </section>
    </div>
  </>
  )
}
