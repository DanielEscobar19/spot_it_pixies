import React from 'react'

export default function PlayerLeadearBoard({name, rank, bestTime, victories}) {
  return (
    <>
      <div className="row d-flex align-items-center mb-3 py-1">
        <div className="col-4 ps-5 col-position">
          <h2>{rank}</h2>
        </div>
        <div className="col-4 ps-5 col-name text-center">
          <h2>{name}</h2>
          <h3>{bestTime}</h3>
        </div>
        <div className="col-4 pe-5 col-wincount text-end">
          <h2>{victories}</h2>
        </div>
      </div>
    </>
  )
}
