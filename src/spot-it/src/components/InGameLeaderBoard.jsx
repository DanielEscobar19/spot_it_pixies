import React, { useState, useEffect } from 'react'
import InGameLeaderBoardPlayer from './InGameLeaderBoardPlayer';
import "../css/components/inGameLeaberboard.scss"

export default function InGameLeaderBoard({players, sessionPin}) {
  const [playerList, setPlayerList] = useState(players.sort((a,b) => a.cardsRemaining - b.cardsRemaining));

  useEffect(() => {
    setPlayerList(players.sort((a,b) => a.cardsRemaining - b.cardsRemaining));
  }, [players]);

  return (
    <>
      <section id="subseccion-nombres">
          {playerList.map((player) => {
             return <InGameLeaderBoardPlayer key={player.id} player={player} sessionPin={sessionPin}/>
            }
          )}
      </section>
    </>
  )
}
