import React, { useState } from 'react'
import LeaderBoardPlayer from './LeaderBoardPlayer';
import "../css/components/inGameLeaberboard.scss"

export default function InGameLeaderBoard({players}) {
  const [playerList,] = useState(players);
  const sortedList = [...playerList].sort((a,b) => a.cardsRemaining - b.cardsRemaining);

  return (
    <>
      <section id="subseccion-nombres">
          {sortedList.map((player) => {
             return <LeaderBoardPlayer key={player.id} player={player}/>
            }
          )}
      </section>
    </>
  )
}
