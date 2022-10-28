import Layout from './Layout'
import '../css/pages/Homepage.scss'

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';

export default function HomePage() {
  const navigate  = useNavigate()
  const [name, setName] = useState('');
  const [session, setSession] = useState('');
  const [sessionPin, setSessionPin] = useState(0);
  
  const validateSession = !(name.length > 0 && session.length > 0);
  

  // variable to store the session pin
  
  useEffect(() => {
    // data fetching here
    // fetching the session pin form api
    // TODO: fecth form our server the session pin
    fetch('https://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1').then(
      (response) => response.json())
      .then((data) => {setSessionPin(data[0])} );
    }, []);

  function createSession() {
    console.log(`Session pin ${window.sessionPin}`);
    navigate(`/new-session?session-pin=${sessionPin}&host-name=${name}&session-name=${session}`, {replace : true});
  }

  return (
    <>
      {/* We renderize the layout component*/}
      <Layout/>
      {/* <Layout /> */}
      {/* Welcome message and image */}
      <section className="row d-flex flex-nowrap align-items-center justify-content-center mt-2">
            <h1 className="Welcome-msg col-12 col-md-7 ">
            <b>Welcome to <u>The Well</u> <br/> 
            A <u>Spot it</u> minigame</b>
            </h1>
            <img src="../../img/Homepage/spot-it-hand.png" alt="Spot it hand decorative" className="col-4 dec-img-spot-it d-none d-md-block img-fluid"/>
      </section>

      <section className="d-flex flex-column justify-content-center mt-3">
          <div className="row inputName d-flex flex-column justify-content-center align-items-center">
            <div className="col d-flex justify-content-center">
              <div className="mb-4 text-center">
                <label className="form-label h2">Your name</label>
                <input value={name} onChange={(e) => {setName(e.currentTarget.value)}} type="text" className="form-control" id="playerName" placeholder="e.g: Timmy" autoFocus={true} size="22"/>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row sessions d-flex flex-wrap justify-content-center">
              <div className="col col-6 mb-3">
                <div className="card create-session">
                  <h2 className="card-header">Create session</h2>
                  <div className="card-body">
                    <label className="form-label h3">Session name</label>
                    <input value={session} onChange={(e) => {setSession(e.currentTarget.value)}} type="text" className="form-control mb-3" id="sessionName" placeholder="e.g: The golden game" size="50"/>
                    <Button onClick={createSession} title="Create" disabled={validateSession} />
                  </div>
                </div>
              </div>
              <div className="col col-6">
                <div className="card join-session">
                  <h2 className="card-header">Join session</h2>
                  <div className="card-body">
                    <label  className="form-label h3">Session pin</label>
                    <input type="text" className="form-control mb-3" id="sessionPin" placeholder="e.g: 1254" size="50"/>
                    <Button title="Join" />
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}
