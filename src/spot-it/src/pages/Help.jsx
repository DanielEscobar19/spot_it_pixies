import '../css/pages/helpPage.scss'

import React, {useEffect} from 'react'
import Layout from './Layout'
import HelpBox from '../components/HelpBox'

export default function Help() {
  const gameRules = [
    "Place one card face down in the center of the table and deal the rest of the cards face down among the players.",
    "All players at the same time will try to find a pair of repeating symbols.",
    "If you find the symbol you say it out loud and discard it in the central pile.",
    "This will be the card you will use to search for the next symbol.",
    "The game continues until one of the players runs out of cards. The first to do so wins the game."
  ];
  const joinGame = [
    "Go to the home page.",
    "Add your name.",
    "Add the code your friend send you under 'Session pin' tag.",
    "Click on the 'Join' button.",
    "Click on 'I'm Ready' button when you are ready.",
    "Wait for the host to start the game.",
    "Have fun playing Spot it!"
  ];
  const createGame = [
    "Go to the home page.",
    "Add your name.",
    "Choose a name for the session and add it under 'Session name' tag.",
    "Click on the 'Create' button.",
    "Share you session code with your friends.",
    "Click on Start when you and your friends are ready.",
    "Have fun playing Spot it!"
  ];

  useEffect(() => {
    document.title = 'Spot it - Help';
  });

  return (
    <>
      <Layout/>
      <div className="px-5">
        <div className ="d-flex my-3 align-items-center">
          <img src="../../img/helpPage/help_icon.svg" alt="arrow icon" className="help-icon"/>
          <h1 className="px-4"><b>Help page</b></h1>
        </div>
        <HelpBox title="Game Rules" list={gameRules} />
        <h1 className="mt-5" >How To Play</h1>
        <HelpBox title="How To Join" list={joinGame} />
        <HelpBox title="How to Create a game" list={createGame} />
        
      </div>
    </>
    )
}
