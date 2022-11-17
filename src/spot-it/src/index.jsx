import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
//import $ from 'jquery';
//import Popper from 'popper.js';
import './css/common/common.scss';
import WaitingRoom from './pages/WaitingRoom';
import HomePage from './pages/HomePage';
import GameRoom from './pages/GameRoom';
import Help from './pages/Help'
import Credits from './pages/Credits';
import Leaderboard from './pages/Leaderboard';

import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorNotFound from './pages/ErrorNotFound';
import { GameProvider } from './context/Game';
import Client from './pages/Client';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GameProvider>
    <Router>
      <Routes>
          <Route path="/client" element={<Client />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home-page" element={<HomePage/>} />
          <Route path="/waiting-room" element={<WaitingRoom />} />
          <Route path="/game-room" element={<GameRoom/>}/>
          <Route path="/help" element={<Help />}/>
          <Route path="/credits" element={<Credits />}/>
          <Route path="/leaderboard" element={<Leaderboard/>}/>
          <Route path="*" element={<ErrorNotFound />}/>
      </Routes>
    </Router>
  </GameProvider>
);
