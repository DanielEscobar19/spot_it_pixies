import React, { useState } from 'react'
import InGameLeaderBoardPlayer from './InGameLeaderBoardPlayer';
import "../css/components/inGameLeaberboard.scss"

export default function InGameLeaderBoard({players}) {
  const [playerList,] = useState(players);
  const sortedList = [...playerList].sort((a,b) => a.cardsRemaining - b.cardsRemaining);

  return (
    <>
      <section id="subseccion-nombres">
          {sortedList.map((player) => {
             return <InGameLeaderBoardPlayer key={player.id} player={player}/>
            }
          )}
      </section>
    </>
  )
}
