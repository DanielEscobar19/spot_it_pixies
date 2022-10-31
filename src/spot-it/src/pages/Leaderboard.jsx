import React, {useState, useEffect} from 'react';
import Layout from './Layout'


export default function Leaderboard() {
return (
  <>
  <Layout/>
  <section class="container text-center">
    <div class="row my-5">
    
      <div class="col">
        <h1> 
          <span class="text-muted">The Well/</span>Session name
        </h1>
      </div>
    
    </div>
    
    <div class="row align-items-end my-5">
      <div class="col d-flex justify-content-end">
        <a type="button" class="btn btn-primary purple-background" href="../Homepage/Homepage.html">Back home</a>
      </div>
  
      <div class="col d-flex flex-column align-items-center">
        <h2>Match duration</h2>
        <div class="box-container mt-2 b-duration">
          <h2>02:10</h2>
        </div>
      </div>
      
      <div class="col justify-content-start">
          <a type="button" class="btn btn-success" href="../WaitingRooms/guestWaitingRoom.html">Play again</a>
      </div>
    
    </div>

  </section>
    <div class="container d-flex">
      <div class="row my-5">
        <div class="col d-flex flex-nowrap justify-content-center align-items-center">
          <img src="../../img/Leaderboard/crown-icon.svg" class="img-fluid crown-icon me-3" alt="Crown icon"/>
          <h2>Leaderboard</h2>
        </div>
      </div>
    </div>

    <div class="container-sm leaderboard-container">

      <div class="row d-flex align-items-center mb-3 py-1">
        <div class="col-4 ps-5 col-position">
          <h2>1</h2>
        </div>
        <div class="col-4 ps-5 col-name text-center">
          <h2>Zeus</h2>
          <h3>02:03</h3>
        </div>
        <div class="col-4 pe-5 col-wincount text-end">
          <h2>4</h2>
        </div>
      </div>

    </div>
    </>
  );
}
