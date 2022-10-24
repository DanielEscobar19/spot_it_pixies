import React from 'react'
import './css/common/common.css';

export default function Layout() {
  return (
    <header>
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">

          <a class="navbar-brand homeLogo" href="./Homepage.html">
            <img src="../../Img/common/spot-it-logo.svg" alt="Spot it logo" class="img-fluid ps-5"/>
          </a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse justify-content-end pe-5" id="navbarText">
            <ul class="navbar-nav mr-auto ">
              <li class="nav-item">
                <a class="nav-link " href="../HelpPage/helpPage.html">Help</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../credits.html">Credits</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
