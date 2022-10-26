import React from 'react'
import { Link } from 'react-router-dom'

export default function Layout({children}) {

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">

            <Link className="navbar-brand homeLogo" to="/home-page" replace="true">
              <img src="../../Img/common/spot-it-logo.svg" alt="Spot it logo" className="img-fluid ps-5"/>
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end pe-5" id="navbarText">
              <ul className="navbar-nav mr-auto ">
                <li className="nav-item">
                  <a className="nav-link " href="../HelpPage/helpPage.html">Help</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="../credits.html">Credits</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Layout renderizes the content received */}
      {children}
    </>
  )
}
