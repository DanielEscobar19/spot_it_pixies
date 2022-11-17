import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import PlayerLeadearBoard from '../components/PlayerLeadearBoard';
import Button from '../components/Button';
import Layout from './Layout'
import "../css/pages/Leaderboard.css"
import  { GameContext } from '../context/Game'

export default function Leaderboard() {
  const {
    players, bestTime, winCount, name, sessionName, finalTime, host
  } = useContext(GameContext);
  const isHost = name === host;
  const indx = players.findIndex((x) => x.name === name);

  const millToTimeFormat = (myDuration) => {
    var result = Math.floor(myDuration/(1000*60*60)) + ":" + Math.floor(myDuration/(1000*60))%60 + ":" + Math.floor(myDuration/1000)%60;
    return result;
  }

  return (
    <>
      <Layout/>
      <section className="container text-center">
        <div className="row my-5">
        
          <div className="col">
            <h1> 
              <span className="text-muted">The Well/</span>{sessionName}
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
            <div className="box-container  b-duration">
              <h3 className="m-0">{millToTimeFormat(finalTime)}</h3>
            </div>
          </div>
          
          <div className="col justify-content-start">
            <Link to={isHost ? '/new-session' : '/existing-session'}> 
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
              <h2>{name}</h2>
              <h3>{millToTimeFormat(bestTime[indx])}</h3>
            </div>
            <div className="col-4 pe-5 col-wincount text-end">
              <h2>{winCount[indx]}</h2>
            </div>
          </div>
          {
            players.map((player, index) => {
              return <PlayerLeadearBoard key={player.id} name={player.name} rank={index + 1} bestTime={millToTimeFormat(bestTime[index])} victories={winCount[index]}/>
            })
          }
        </div>
    </>
  );
}
