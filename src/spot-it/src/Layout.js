import React from 'react'
import { Link } from 'react-router-dom'
import './/css/common/common.css'

export default function Layout() {

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-light unselectable-text">
          <div className="container-fluid">

            <Link className="navbar-brand homeLogo unselectable-text" to="/home-page" replace="true">
              <img src="../../Img/common/spot-it-logo.svg" alt="Spot it logo" className="img-fluid ps-5"/>
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon unselectable-text"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end pe-5" id="navbarText">
              <ul className="navbar-nav mr-auto ">
                <li className="nav-item">
                  <Link to="/help" className="nav-link unselectable-text">Help</Link>
                </li>
                <li className="nav-item">
                  <Link to="/credits" className="nav-link unselectable-text">Credits</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
