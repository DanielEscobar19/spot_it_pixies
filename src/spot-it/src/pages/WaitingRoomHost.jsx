import '../css/waitingRooms/waitingRoom.scss'

import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';

import Layout from './Layout'
import Button from '../components/Button';
import ConnectedPlayers from '../components/ConnectedPlayers';
import { SocketContext } from '../context/socket';


export default function WaitingRoomHost() {
  const location = useLocation();
  const [playerId, setPlayerId] = useState(0);
  const socket = useContext(SocketContext);
  useEffect(() => {
    document.title = 'Spot it - Waiting room - guest';
  }, []);

  // ********
  // Testing console prints
  console.log( "\n\nsession-pin received " + location.state.sessionPin);
  console.log( "session-name received " + location.state.sessionName);
  console.log( "host-name received " + location.state.hostName);
  // ********

  // TODO: add the new connected players. This logic is managed through sockets
  const [playersList,setPlayerList] = useState([{type: "host", name : location.state.hostName, isConnected : true, id: 0}]);

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
              , actualPlayer : playersList.find((x) => x.name == location.state.hostName)
              , sessionName :location.state.sessionName
              , sessionPin : location.state.sessionPin
            }} to={{pathname: "/game-room",}}> 
            <Button title="Start" onClick={() => {socket.emit("start_game", location.state.sessionPin)}} /> 
          </Link>
        </div>
      </div>

    </section>

    <ConnectedPlayers playersList={playersList} setPlayerList={setPlayerList} sessionPin={location.state.sessionPin} playerId={playerId} setPlayerId={setPlayerId}/>
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
