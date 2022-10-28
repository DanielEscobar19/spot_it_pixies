import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
//import $ from 'jquery';
//import Popper from 'popper.js';
import './css/common/common.css';
import WaitingRoomHost from './WaitingRoomHost';
import HomePage from './HomePage';
import GameRoom from './GameRoom';
import Help from './Help'
import Credits from './Credits';

import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home-page" element={<HomePage/>} />
        <Route path="/new-session" element={<WaitingRoomHost />} />
        <Route path="/game-room" element={<GameRoom/>}/>
        <Route path="/help" element={<Help />}/>
        <Route path="/credits" element={<Credits />}/>
    </Routes>
  </Router>
);
