import Layout from './Layout'
import './css/Homepage/Homepage.css'
import './css/common/common.css'
import { useNavigate } from 'react-router-dom';
import React, { useRef } from 'react';

export default function HomePage() {
  const navigate  = useNavigate()
  const userNameRef = useRef();
  const SessionNameRef = useRef();
  let sessionName = "";
  let username = "";
  function handleUsernameInput(e) {
    username = userNameRef.current.value;
    console.log(`Name: ${userNameRef.current.value}`);
  }
  
  function handleSessionNameInput(e) {
    sessionName = SessionNameRef.current.value;
    console.log(`Session: ${SessionNameRef.current.value}`);
  }
  
  
  function createSession() {
    if (sessionName === "") {
      alert("You have to assign a name for the session.");
    } else {
      if (username === "") {
        alert("Do not forget to create your gamertag!");
      } else {
  
      }
    
      let sessionId = 1234;
      navigate(`/new-session?session-id=${sessionId}`, {replace : true});
    }
  }
  



  function joinSession() {

  }

  return (
    <section>
      {/* We renderize the layout component*/}
      <Layout>
        {/* <Layout /> */}
        {/* Welcome message and image */}
        <section className="row d-flex flex-nowrap align-items-center justify-content-center mt-2">
              <h1 className="Welcome-msg col-12 col-md-7 ">
                <b>Welcome to <u>The Well</u> <br/> 
                A <u>Spot it</u> minigame</b>
              </h1>
              <img src="../../img/Homepage/spot-it-hand.png" alt="Spot it hand decorative" className="col-4 dec-img-spot-it d-none d-md-block img-fluid"/>
        </section>

        <section className="d-flex justify-content-center mt-3">
          <form action="Homepage.html" method="GET">
            <div className="row inputName d-flex flex-column justify-content-center align-items-center">
              <div className="col d-flex justify-content-center">
                <div className="mb-4 text-center">
                  <label className="form-label h2">Your name</label>
                  <input ref={userNameRef} onInput={handleUsernameInput} type="text" className="form-control" id="playerName" placeholder="e.g: Timmy" autoFocus={true} size="22"/>
                </div>
              </div>
            </div>
            <div className="row sessions d-flex flex-wrap justify-content-center">
              <div className="col col-6 mb-3">
                <div className="card create-session">
                  <h2 className="card-header">Create session</h2>
                  <div className="card-body">
                    <label className="form-label h3">Session name</label>
                    <input ref={SessionNameRef} onInput={handleSessionNameInput} type="text" className="form-control mb-3" id="sessionName" placeholder="e.g: The golden game" size="50"/>
                    <button onClick={createSession} className="btn btn-primary btn-lg">Create</button>
                  </div>
                </div>
              </div>
              <div className="col col-6">
                <div className="card join-session">
                  <h2 className="card-header">Join session</h2>
                  <div className="card-body">
                    <label  className="form-label h3">Session pin</label>
                    <input type="text" className="form-control mb-3" id="sessionPin" placeholder="e.g: 1254" size="50"/>
                    <button className="btn btn-primary btn-lg">Join</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </Layout>
    </section>
  );
}
