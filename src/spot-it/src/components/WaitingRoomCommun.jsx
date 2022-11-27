import React, { useState, useContext } from 'react'
import Button from './Button';
import ConnectedPlayers from './ConnectedPlayers';
import  { GameContext } from '../context/Game'
import PropTypes from 'prop-types';


export default function WaitingRoom( { onClick } ) {
  const {
    name, sessionName, roomId, host, readyCount, playersCount
  } = useContext(GameContext);
  const playersReady = readyCount === playersCount;
  const isHost = host === name;
  let playerId = 0;

  const [playersList,setPlayerList] = useState([{type: "guest", name : name, isConnected : false, id: playerId++ }]);

  return (
    <>
    {/* <!-- information about the session section --> */}
    <section className="container text-center">
      <div className="row my-5">
      
        <div className="col">
          <h1> 
            {/* <!-- TODO: Instead of "Session name", we must put the name given by the host" --> */}
            <span className="text-muted">The Well/</span>{sessionName}
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
            <p>{playersCount}</p>
          </div>
        </div>

        {/* <!-- Session pin --> */}
        <div className="col text-center d-flex flex-column justify-content-center align-items-center">
          <h2 className="unselectable-text">Session pin</h2>
          <div className="box-container mt-2">
            {/* <!-- TODO: The pin is generated automatically following a generation algorithm --> */}
            <p className="selectable-text-all">{roomId}</p>
          </div>
        </div>
        
        {/* <!-- TODO: Start button. Is clickable if all players are ready  Disabled attribute is removed in this case--> */}
        <div className="col d-flex justify-content-center" title="Ready option will be implemented in future versions">
            { isHost ? <Button title="Start" disabled={!playersReady} onClick={onClick} />
            : <Button  onClick={onClick} title="I'm ready"/> }
        </div>
      </div>

    </section>

    <ConnectedPlayers 
      playersList={playersList}
      setPlayerList={setPlayerList}
      playerId={playerId}
      sessionPin={roomId}
      sessionName={sessionName}
      playerActual={playersList[0]}
    />
  </>
  )
}

WaitingRoom.propTypes = {
  onClick: PropTypes.func
};
