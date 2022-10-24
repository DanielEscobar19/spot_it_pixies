import React from 'react'
import Layout from './Layout'
import './css/common/common.css'
import './css/Homepage/Homepage.css'

export default function HomaPage() {
  

  return (
    <section>
      // We renderize the layout component
      <Layout />

      // Welcome message and image
      <section class="row d-flex flex-nowrap align-items-center justify-content-center mt-2">
            <h1 class="Welcome-msg col-12 col-md-7 ">
              <b>Welcome to <u>The Well</u> <br/> 
              A <u>Spot it</u> minigame</b>
            </h1>
            <img src="../../img/Homepage/spot-it-hand.png" alt="Spot it hand decorative" class="col-4 dec-img-spot-it d-none d-md-block img-fluid"/>
      </section>

      <section class="d-flex justify-content-center mt-3">
        <form action="Homepage.html" method="GET">
          <div class="row inputName d-flex flex-column justify-content-center align-items-center">
            <div class="col d-flex justify-content-center">
              <div class="mb-4 text-center">
                <label for="playerName" class="form-label h2">Your name</label>
                <input type="text" class="form-control" id="playerName" placeholder="e.g: Timmy" autofocus size="22"/>
              </div>
            </div>
          </div>
          <div class="row sessions d-flex flex-wrap justify-content-center">
            <div class="col col-6 mb-3">
              <div class="card create-session">
                <h2 class="card-header">Create session</h2>
                <div class="card-body">
                  <label for="sessionName" class="form-label h3">Session name</label>
                  <input type="text" class="form-control mb-3" id="sessionName" placeholder="e.g: The golden game" size="50"/>
                  <a href="../WaitingRooms/hostWaitingRoom.html" class="btn btn-primary btn-lg">Create</a>
                </div>
              </div>
            </div>
            <div class="col col-6">
              <div class="card join-session">
                <h2 class="card-header">Join session</h2>
                <div class="card-body">
                  <label for="sessionPin" class="form-label h3">Session pin</label>
                  <input type="text" class="form-control mb-3" id="sessionPin" placeholder="e.g: 1254" size="50"/>
                  <a href="../WaitingRooms/guestWaitingRoom.html" class="btn btn-primary btn-lg">Join</a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}
