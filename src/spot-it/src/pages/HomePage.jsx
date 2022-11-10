import Layout from './Layout'
import '../css/pages/Homepage.scss'
import { io } from "socket.io-client";

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import Button from '../components/Button';
import { SocketContext } from '../context/socket';

export default function HomePage() {
  const [joinError, setJoinError] = useState(false);

  const [name, setName] = useState('');
  const navigate  = useNavigate()

  // creation of session variables
  const [session, setSession] = useState('');
  const [sessionPin, setSessionPin] = useState(0);
  const validateSession = !(name.length > 0 && session.length > 0);

  // joining a session variables
  const [canJoin, setCanJoin] = useState(false);
  const [joinSessionPin, setJoinSessionPin] = useState(0);
  const validateJoinSession = !(name.length > 0 && joinSessionPin > 0);

  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("room_id", (roomId) => {
      setSessionPin(roomId);
    })

    socket.on("join_validation", (canJoin, sessionName) => {
      setCanJoin(canJoin);
      if (sessionName !== "") {
        setSession(sessionName);
      }
      console.log("canJoin ", canJoin);
      if (canJoin === true) {
        setJoinError(false);
      } else {
        setJoinError(true);
      }
    })
    
  }, [socket])
  
  useEffect(() => {
    if (sessionPin > 0) {
      console.log(`Created session with number ${sessionPin}`);
      navigate("/new-session", 
      {replace : true, 
      state : {
        sessionPin : sessionPin,
        hostName : name,
        sessionName : session,
      }});
    }
  }, [sessionPin])

  useEffect(() => {
    if (canJoin === true) {
      console.log(`Can join session with number ${sessionPin}`);

      navigate(`/existing-session`, 
      {replace : true, 
      state : {
        sessionPin : joinSessionPin,
        guestName : name,
        sessionName : session,
      }});

    } else {
      console.log("Couldn't join");
    }
  }, [canJoin])

  function createSession() {
    socket.emit("create_session", name, session);
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
                    <div className={`${joinError === true? "" : "hiden"} alert alert-warning unselectable-text ms-1 mt-2 me-1 mb-0`} role="alert">
                      Could not join the session {joinSessionPin}
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
