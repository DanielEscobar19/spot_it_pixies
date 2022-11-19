import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import PlayerLeadearBoard from '../components/PlayerLeadearBoard';
import Button from '../components/Button';
import Layout from './Layout';
import "../css/pages/Leaderboard.css";
import  { GameContext } from '../context/Game';
import socket from "../Socket";

export default function Leaderboard() {
  const {
    players, bestTime, winCount, name, setCanJoin, sessionName, finalTime, roomId
  } = useContext(GameContext);
  const playerList = [];
  const indx = players.findIndex((x) => x === name);
  const result = Array.from(Array(winCount.length).keys())
      .sort((a, b) => winCount[a] > winCount[b] ? -1 : (winCount[b] > winCount[a]) | 0);
  for (let val of result){
    if(players[val].length > 0){
      playerList.push(val);
    }
  };
  console.log(playerList[0], indx, playerList[0] === indx);
  console.log(playerList, indx);
  
  useEffect(() => {
    setCanJoin(false);
  }, [])

  const millToTimeFormat = (myDuration) => {
    var result = Math.floor(myDuration/(1000*60*60)) + ":" + Math.floor(myDuration/(1000*60))%60 + ":" + Math.floor(myDuration/1000)%60;
    return result;
  }

  const backHome = () => {
    socket.emit("abandon_game", name, roomId);
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
            <Link onClick={backHome} to={"/home-page"} replace={true}> 
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
            <Link to="/waiting-room"> 
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
              <h3>Rank</h3>
            </div>
            <div className="col-4 ps-5 col-name text-center">
              <h3>Best time</h3>
            </div>
            <div className="col-4 pe-5 col-wincount text-end">
              <h3>Win count</h3>
            </div>
          </div>
          {
            playerList.map((id, index) => {
              return <PlayerLeadearBoard key={index} name={players[id]} rank={index + 1} bestTime={millToTimeFormat(bestTime[id])} victories={winCount[id]}/>
            })
          }
        </div>
    </>
  );
}
