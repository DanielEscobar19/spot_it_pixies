import React from 'react'

export default function PlayerLeadearBoard({player}) {
  return (
    <>
      <div class="container-sm leaderboard-container">
        <div class="row d-flex align-items-center mb-3 py-1">
          <div class="col-4 ps-5 col-position text-center">
            <h2>1</h2>
          </div>
          <div class="col-4 ps-5 col-name text-center">
            <h2>{player.name}</h2>
            <h3>{player.time}</h3>
          </div>
          <div class="col-4 pe-5 col-wincount text-center">
            <h2>{player.victories}</h2>
          </div>
        </div>
      </div>
    </>
  )
}
