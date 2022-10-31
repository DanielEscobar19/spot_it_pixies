import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import PlayerLeadearBoard from '../components/PlayerLeadearBoard';

import Layout from './Layout'


export default function Leaderboard() {
  const location = useLocation();

  const [players, ] = useState(location.state.playersConnected);
  console.log(players);
  return (
    <>
      <Layout/>
      <section className="container text-center">
        <div className="row my-5">
        
          <div className="col">
            <h1> 
              <span className="text-muted">The Well/</span>{location.state.sessionName}
            </h1>
          </div>
        
        </div>
        
        <div className="row align-items-end my-5">
          <div className="col d-flex justify-content-center">
            <a type="button" className="btn btn-primary purple-background" href="../Homepage/Homepage.html">Back home</a>
          </div>
      
          <div className="col d-flex flex-column align-items-center">
            <h2>Match duration</h2>
            <div className="box-container mt-2 b-duration">
              <h2>02:10</h2>
            </div>
          </div>
          
          <div className="col justify-content-start">
              <a type="button" className="btn btn-success" href="../WaitingRooms/guestWaitingRoom.html">Play again</a>
          </div>
        
        </div>
      </section>

        <div className="container d-flex">
          <div className="row my-5">
            <div className="col d-flex flex-nowrap justify-content-center align-items-center">
              <img src="../../img/Leaderboard/crown-icon.svg" className="img-fluid crown-icon me-3" alt="Crown icon"/>
              <h2>Leaderboard</h2>
            </div>
          </div>
        </div>
        <div class="container-sm leaderboard-container mt-3">
          <div class="row d-flex align-items-center mb-3 py-1">
            <div class="col-4 ps-5 col-position">
              <h2>Rank</h2>
            </div>
            <div class="col-4 ps-5 col-name text-center">
              <h2>Player name</h2>
            </div>
            <div class="col-4 pe-5 col-wincount text-center">
              <h2>Victories</h2>
            </div>
          </div>
        </div>
        {
          players.map((player, index) => {
            if (index === 0) {
              ++player.victories;
            }
            return <PlayerLeadearBoard player={player}/>
          })
        }
    </>
  );
}
