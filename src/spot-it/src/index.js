import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
//import $ from 'jquery';
//import Popper from 'popper.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/common/common.css';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import WaitingRoomHost from './WaitingRoomHost';
import HomePage from './HomePage';

// the first session will have the code 100
let sessionPin = 100;

const setSessionPin = (newValue) => {
  sessionPin = newValue;
  console.log(`base pin of app index: ${sessionPin}`);
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
        <Route path="/" element={<HomePage session={{sessionPin, setSessionPin}} />} />
        <Route path="/home-page" element={<HomePage session={{sessionPin, setSessionPin}}/>} />
        <Route path="/new-session" element={<WaitingRoomHost />} />
    </Routes>
  </Router>
);
