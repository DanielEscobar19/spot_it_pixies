import React, { useState, useEffect } from 'react'
import InGameLeaderBoardPlayer from './InGameLeaderBoardPlayer';
import { useContext } from 'react'
import  { GameContext } from '../context/Game'

export default function InGameLeaderBoard() {
  const { playerCardsRemaining, players } = useContext(GameContext);
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    let result = Array.from(Array(playerCardsRemaining.length).keys())
      .sort((a, b) => playerCardsRemaining[a] < playerCardsRemaining[b] ? -1 : (playerCardsRemaining[b] < playerCardsRemaining[a]) | 0);
    let newArr = [];
    for (let val of result){
      if(players[val].length > 0){
        newArr.push(val);
      }
    }
    setPlayerList(newArr);
  }, [playerCardsRemaining, players]);

  return (
    <>
      <section id="subseccion-nombres">
          {playerList.map((id) => {
             return <InGameLeaderBoardPlayer key={id} name={players[id]} cards={playerCardsRemaining[id]}/>
            }
          )}
      </section>
    </>
  )
}
