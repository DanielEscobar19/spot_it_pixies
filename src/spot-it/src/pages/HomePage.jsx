import Layout from './Layout'
import '../css/pages/Homepage.scss'
import { io } from "socket.io-client";

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';

export default function HomePage() {
  const [name, setName] = useState('');
  const navigate  = useNavigate()

  // creation of session
  const [session, setSession] = useState('');
  const [sessionPin, setSessionPin] = useState(0);
  const validateSession = !(name.length > 0 && session.length > 0);

  // joining a session
  const [canJoin, setCanJoin] = useState(false);
  const [joinSessionPin, setJoinSessionPin] = useState(0);
  const validateJoinSession = !(name.length > 0 && joinSessionPin > 0);
  // useEffect(() => {
  //   // data fetching here
  //   // fetching the session pin form api
  //   // TODO: fecth from our server the session pin
  //   fetch('https://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1').then(
  //     (response) => response.json())
  //     .then((data) => {setSessionPin(data[0])} );
  // }, []);

  // TODO: connect to server in oracle or debian machine
  const socket = io.connect("http://localhost:3001");
  useEffect(() => {
    socket.on("room_id", (roomId) => {
      setSessionPin(roomId);
    })
    
    socket.on("join_validation", (canJoin) => {
      setCanJoin(canJoin);
    })
    
  }, [socket, sessionPin])
  
  function createSession() {
    socket.emit("create_session");
    if (sessionPin > 0) {
      console.log(`Created session with number ${sessionPin}`);
      navigate(`/new-session?session-pin=${sessionPin}&host-name=${name}&session-name=${session}`);
    }
  }

  function joinSession() {
    console.log("Trying join session ", joinSessionPin, "  ", name);
    socket.emit("join_session", {sessionId : joinSessionPin, playerName : name});
    if (canJoin === true) {
      console.log(`Can join session with number ${sessionPin}`);
      alert("Puede entrar");
    } else {
      console.log("Couldn't join");
    }
  }

  return (
    <>
      {/* We renderize the layout component*/}
      <Layout/>
      {/* Welcome message and image */}
      <section className="row d-flex flex-nowrap align-items-center justify-content-center mt-2 unselectable-text">
            <h1 className="Welcome-msg col-12 col-md-7 selectable-text">
            <b>Welcome to <u>The Well</u> <br/> 
            A <u>Spot it</u> minigame</b>
            </h1>
            <img src="../../img/Homepage/spot-it-hand.png" alt="Spot it hand decorative" className="col-4 dec-img-spot-it d-none d-md-block img-fluid"/>
      </section>

      <section className="d-flex flex-column justify-content-center ">
          <div className="row inputName d-flex flex-column justify-content-center align-items-center mt-1">
            <div className="col d-flex justify-content-center">
              <div className="mb-4 text-center unselectable-text">
                <label className="form-label h2">Your name</label>
                <input value={name} onChange={(e) => {setName(e.currentTarget.value)}} type="text" className="form-control" id="playerName" placeholder="e.g: Timmy" autoFocus={true}/>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row sessions d-flex flex-wrap justify-content-center">
              <div className="col col-6 mb-3">
                <div className="card create-session unselectable-text">
                  <h2 className="card-header">Create session</h2>
                  <div className="card-body">
                    <label className="form-label h3">Session name</label>
                    <input value={session} onChange={(e) => {setSession(e.currentTarget.value)}} type="text" className="form-control mb-3" id="sessionName" placeholder="e.g: The golden game" size="50"/>
                    <Button onClick={createSession} title="Create" disabled={validateSession} />
                  </div>
                </div>
              </div>
              <div className="col col-6">
                <div className="card join-session unselectable-text">
                  <h2 className="card-header">Join session</h2>
                  <div className="card-body">
                    <label  className="form-label h3">Session pin</label>
                    <input value={joinSessionPin} onChange={(e) => {setJoinSessionPin(e.currentTarget.value)}} type="text" className="form-control mb-3" id="sessionPin" placeholder="e.g: 1254" size="50"/>
                    <Button onClick={joinSession} title="Join" disabled={validateJoinSession} />
                    <div className="alert alert-warning unselectable-text ms-1 mt-2 me-1 mb-0" role="alert">
                      Joining a session is not available at the moment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}
