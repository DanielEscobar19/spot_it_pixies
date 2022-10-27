import './css/helpPage/helpPage.css'

import React, {useEffect} from 'react'
import Layout from './Layout'

export default function Help() {
  useEffect(() => {
    document.title = 'Spot it - Help';
  });

  // Show and hide help information for easy access
  function help(position) {
    let text = document.getElementsByClassName('hiden')[position];
    let arrow = document.getElementsByClassName('arrow-icon')[position];
    if (text.style.display === "block") {
      text.style.display = "none";
      arrow.src = "../../img/helpPage/angle_right.svg";
    } else {
      text.style.display = "block";
      arrow.src = "../../img/helpPage/angle_down.svg";
    }
  }

  return (
    <>
      <Layout/>
      <div className="px-5">
        <div className ="d-flex my-3 align-items-center">
          <img src="../../img/helpPage/help_icon.svg" alt="arrow icon" className="help-icon"/>
          <h1 className="px-4"><b>Help page</b></h1>
        </div>

        {/* <!-- Help Box --> */}
        <div className="d-flex mb-3 mt-5" onClick={help(0)}>
          <section className="help-box-container py-3 align-items-start">
            <div className="button-and-tittle">
              <img src="../../img/helpPage/angle_right.svg" alt="arrow icon" className="arrow-icon"/>
              <h1 className="px-3">Game Rules</h1>
            </div>
            {/* <!-- Collapsable --> */}
            <ul className="hiden mx-4" >
              <li>Place one card face down in the center of the table and deal the rest of the cards face down among the players.</li>
              <li>All players at the same time will try to find a pair of repeating symbols.</li>
              <li>If you find the symbol you say it out loud and discard it in the central pile.</li>
              <li>This will be the card you will use to search for the next symbol.</li>
              <li>The game continues until one of the players runs out of cards. The first to do so wins the game.</li>
            </ul>
          </section>
        </div>
        <h1 className="mt-5" >How To Play</h1>

        {/* <!-- Help Box --> */}
        <div className="d-flex mb-3 mt-5" onClick={help(1)}>
          <section className="help-box-container py-3 align-items-start">
            <div className="button-and-tittle">
              <img src="../../img/helpPage/angle_right.svg" alt="arrow icon" className="arrow-icon"/>
              <h1 className="px-3">How To Join</h1>
            </div>
            {/* <!-- Collapsable --> */}
            <ul className="hiden mx-4" >
              <li>Go to the <a href="../Homepage/Homepage.html">home</a> page.</li>
              <li>Add your name.</li>
              <li>Add the code your friend send you under 'Session pin' tag.</li>
              <li>Click on the 'Join' button.</li>
              <li>Click on 'I'm Ready' button when you are ready.</li>
              <li>Wait for the host to start the game.</li>
              <li>Have fun playing Spot it!</li>
            </ul>
          </section>
        </div>

        {/* <!-- Help Box --> */}
        <div className="d-flex mb-3 mt-4" onClick={help(2)}>
          <section className="help-box-container py-3 align-items-start">
            <div className="button-and-tittle"> 
              <img src="../../img/helpPage/angle_right.svg" alt="help icon" className="arrow-icon"/>
              <h1 className="px-3">How to Create a game</h1>
            </div>
            {/* <!-- Collapsable --> */}
            <ul className="hiden mx-4" >
              <li>Go to the <a href="../Homepage/Homepage.html">home</a> page.</li>
              <li>Add your name.</li>
              <li>Choose a name for the session and add it under 'Session name' tag.</li>
              <li>Click on the 'Create' button.</li>
              <li>Share you session code with your friends.</li>
              <li>Click on Start when you and your friends are ready.</li>
              <li>Have fun playing Spot it!</li>
            </ul>
          </section>
        </div>
      </div>
    </>
    )
}
