import Layout from './Layout'
import '../css/pages/Homepage.scss'

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import Button from '../components/Button';
import socket from "../Socket";
import  { GameContext } from '../context/Game'


export default function HomePage() {
  const {
    errorMessage, name, setName, roomId, setRoomId, canJoin, setCanJoin, sessionName, setSessionName, setHost
  } = useContext(GameContext);
  const navigate  = useNavigate()

  // creation of session variables
  const validateSession = !(name.length > 0 && sessionName.length > 0);

  // joining a session variables
  const [joinSessionPin, setJoinSessionPin] = useState(0);
  const validateJoinSession = !(name.length > 0 && joinSessionPin > 0);
  
  useEffect(() => {
    setCanJoin(false);
    setRoomId(0);
  }, [])

  useEffect(() => {
    console.log("Home page can join ", canJoin);
  })

  useEffect(() => {
    if (roomId > 0 && !canJoin) {
      // if session pin is greater than 0 it means we received the new pin form the server
      console.log(`Created session with number ${roomId}`);
      navigate("/waiting-room");
      setHost(name);
    }
    if (canJoin === true) {
      setCanJoin(false);
      console.log(`Can join session with number ${roomId}`);
      navigate("/waiting-room");
    } else {
      console.log("Couldn't join");
    }
  }, [roomId, canJoin])

  function createSession() {
    console.log("Trying create session ", sessionName, name);
    socket.emit("create_session", name, sessionName);
  }

  function joinSession() {
    console.log("Trying join session ", joinSessionPin, "  ", name);
    socket.emit("join_session", name, joinSessionPin);
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
                    <input value={sessionName} onChange={(e) => {setSessionName(e.currentTarget.value)}} type="text" className="form-control mb-3" id="sessionName" placeholder="e.g: The golden game" size="50"/>
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
                    <div className={`${errorMessage.length > 0 ? "" : "hiden"} alert alert-warning unselectable-text ms-1 mt-2 me-1 mb-0`} role="alert">
                      {errorMessage}
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
