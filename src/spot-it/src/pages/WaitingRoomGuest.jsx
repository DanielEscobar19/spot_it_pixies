import '../css/waitingRooms/waitingRoom.scss'
import '../css/waitingRooms/guestRoom.css'

import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Layout from './Layout'
import Button from '../components/Button';
import ConnectedPlayers from '../components/ConnectedPlayers';
import { SocketContext } from '../context/socket';


export default function WaitingRoomGuest() {
  const location = useLocation();
  const socket = useContext(SocketContext);
  let playerId = 0;

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Spot it - Waiting room - guest';
    socket.emit("get_players", location.state.sessionPin);
  }, []);

  // ********
  // Testing console prints
  console.log( "\n\nsession-pin received " + location.state.sessionPin);
  console.log( "session-name received " + location.state.sessionName);
 
  console.log( "guest-name received " + location.state.guestName);
  // ********
  
  
  // TODO: add the new connected players. This logic is managed through sockets
  const [playersList,setPlayerList] = useState([{type: "guest", name : location.state.guestName, isConnected : false, id: playerId++ }]);

  useEffect(() => {
    console.log("Update de playersList ", playersList);
  }, [playersList]);

  useEffect(() => {
    socket.on("new_join_player" , (players) => {
      console.log("Received players ", players);
      updatePlayers(players);
    })

    socket.on("players_list", (players) => {
      console.log("Received players ", players);
      updatePlayers(players);
    })

    function updatePlayers(players) {
      let playerType = "";
      console.log("players.length ", players.length);
      for(let i = 0; i < players.length; ++i) {
        if (playersList.findIndex((x) => x.name == players[i]) < 0) {
          if (i > 0) {
            playerType = "player";
          } else {
            playerType = "host";
          }

          setPlayerList([...playersList, {type : playerType, name : players[i], isConnected : false, 
            id : playerId++ }])
        }
      }

      console.log("playersList ", playersList);
    }
  }, [socket, playersList]);
  

  useEffect(() => {
    socket.on("newReadyGuest", (guestData) => {
      let index = playersList.findIndex((x) => x.name == guestData.guestName);
      let newPlayersList = [...playersList];
      newPlayersList[index].isConnected = guestData.boolGuestReady;
      setPlayerList(newPlayersList);
    });


    socket.on("started_game", (useless) => {
      console.log("Game started");
      navigate("/game-room", {
        replace : true,
         state : { 
          playersConnected : playersList
          , actualPlayer : playersList.find((x) => x.name == location.state.guestName)
          , sessionName :location.state.sessionName
          , sessionPin : location.state.sessionPin
      }})
    });
  },[socket]);


  function clickedReady () {
    let index = playersList.findIndex((x) => x.name == location.state.guestName);

    let newList = [...playersList];
    newList[index].isConnected = true;
    setPlayerList(newList);

    socket.emit("guestIsReady", {guestName: location.state.guestName, boolGuestReady: true, sessionPin: location.state.sessionPin})
  }

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
            <Button onClick={clickedReady} title="I'm ready" />
        </div>
      </div>

    </section>

    <ConnectedPlayers playersList={playersList}/>

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
      <img src="../../Img/common/spot_it_hand.svg" alt="Spot it hand" className="hand-logo"/>
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

