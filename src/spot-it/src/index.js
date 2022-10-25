import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
//import $ from 'jquery';
//import Popper from 'popper.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/common/common.css';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import WaitingRoomHost from './WaitingRoomHost';
import HomePage from './HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Homepage" element={<HomePage />} />
        <Route path="/WaitingRoomHost" element={<WaitingRoomHost />} />
    </Routes>
  </Router>
);
