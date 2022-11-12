import '../css/waitingRooms/waitingRoom.scss'

import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';

import Layout from './Layout'
import Button from '../components/Button';
import ConnectedPlayers from '../components/ConnectedPlayers';
import { SOCKET_URL } from '../context/socket';
import { io } from "socket.io-client";


export default function WaitingRoomHost() {
  const location = useLocation();
  let playerId = 0;

  const socket = io.connect(SOCKET_URL);

  useEffect(() => {
    document.title = 'Spot it - Waiting room - host';
    socket.emit("join-socket-room", location.state.sessionPin);
  }, []);

  const [playersList,setPlayerList] = useState([{type: "host", name : location.state.actualPlayerName, isConnected : true, id: playerId++}]);

  return (
    <>
    <Layout/>
    {/* <!-- information about the session section --> */}
    <section className="container text-center">
      <div className="row my-5">
      
        <div className="col">
          <h1> 
            {/* <!-- TODO: Instead of "Session name", we must put the name given by the host" --> */}
            <span className="text-muted">The Well/</span>{location.state.sessionName}
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
            <p>{playersList.length}</p>
          </div>
        </div>

        {/* <!-- Session pin --> */}
        <div className="col text-center d-flex flex-column justify-content-center align-items-center">
          <h2 className="unselectable-text">Session pin</h2>
          <div className="box-container mt-2">
            {/* <!-- TODO: The pin is generated automatically following a generation algorithm --> */}
            <p className="selectable-text-all">{location.state.sessionPin}</p>
          </div>
        </div>
        
        {/* <!-- TODO: Start button. Is clickable if all players are ready  Disabled attribute is removed in this case--> */}
        <div className="col d-flex justify-content-center">
          <Link replace={true} state={
            {playersConnected : playersList
              , actualPlayer : playersList.find((x) => x.name == location.state.actualPlayerName)
              , sessionName :location.state.sessionName
              , sessionPin : location.state.sessionPin
            }} to={{pathname: "/game-room",}}> 
            <Button title="Start" onClick={() => {socket.emit("start_game", location.state.sessionPin)}} /> 
          </Link>
        </div>
      </div>
    </section>

    <ConnectedPlayers playersList={playersList} setPlayerList={setPlayerList} playerId={playerId} sessionPin={location.state.sessionPin} sessionName={location.state.sessionName} playerActual={playersList[0]}/>
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
