import React, {useState, useEffect} from 'react';
import { useLocation, Link } from "react-router-dom";
import PlayerLeadearBoard from '../components/PlayerLeadearBoard';
import Button from '../components/Button';
import Layout from './Layout'
import "../css/pages/Leaderboard.css"

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
            <Link  to={"/home-page"} replace={true}> 
              <Button title="Back home"/>
            </Link>
          </div>
      
          <div className="col d-flex flex-column align-items-center">
            <h2>Match duration</h2>
            <div className="box-container mt-2 b-duration">
              <h2>02:10</h2>
            </div>
          </div>
          
          <div className="col justify-content-start">
            <Link to={`/new-session?session-pin=${location.state.sessionPin}&host-name=${players.find(x => x.type === "host").name}&session-name=${location.state.sessionName}`} replace={true}> 
              <Button title="Play again"/>
            </Link>
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
        <div className="container-sm leaderboard-container">
          {/* <!--TODO reuse code for rows--> */}
          {/* <!--Player 1--> */}
          <div className="row d-flex align-items-center mb-3 py-1">
            <div className="col-4 ps-5 col-position">
              <h2>Rank</h2>
            </div>
            <div className="col-4 ps-5 col-name text-center">
              <h2>Name</h2>
              <h3>personal best time</h3>
            </div>
            <div className="col-4 pe-5 col-wincount text-end">
              <h2>Wincount</h2>
            </div>
          </div>
          {
            players.map((player, index) => {
              if (index === 0) {
                ++player.victories;
              }
              return <PlayerLeadearBoard key={player.id} player={player} rank={index + 1}/>
            })
          }
        </div>
    </>
  );
}
