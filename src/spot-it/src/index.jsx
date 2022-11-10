import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
//import $ from 'jquery';
//import Popper from 'popper.js';
import './css/common/common.scss';
import WaitingRoomHost from './pages/WaitingRoomHost';
import WaitingRoomGuest from './pages/WaitingRoomGuest';
import HomePage from './pages/HomePage';
import GameRoom from './pages/GameRoom';
import Help from './pages/Help'
import Credits from './pages/Credits';
import Leaderboard from './pages/Leaderboard';

import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorNotFound from './pages/ErrorNotFound';
import {SocketContext, socket} from './context/socket';
import Client from './pages/Client';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SocketContext.Provider value={socket}>
    <Router>
      <Routes>
          <Route path="/client" element={<Client />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/existing-session" element={<WaitingRoomGuest />} />
          <Route path="/home-page" element={<HomePage/>} />
          <Route path="/new-session" element={<WaitingRoomHost />} />
          <Route path="/game-room" element={<GameRoom/>}/>
          <Route path="/help" element={<Help />}/>
          <Route path="/credits" element={<Credits />}/>
          <Route path="/leaderboard" element={<Leaderboard/>}/>
          <Route path="*" element={<ErrorNotFound />}/>
      </Routes>
    </Router>
  </SocketContext.Provider>
);
