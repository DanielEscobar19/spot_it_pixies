import React from 'react';
import Button from './Button';
import "../css/components/modal.scss";

const Modal = ( { handleClose } ) => {
  const gameRules = [
    "There would be two card on the board one under your name and the commun card under 'Top of the Well'.",
    "All players at the same time will try to find a pair of repeating symbols between the two cards.",
    "If you find the symbol click on the symbol on the card under your name.",
    "This will be the card you will use to search for the next symbol.",
    "The game continues until one of the players runs out of cards. The first to do so wins the game."
  ];

  return (
    <div className="help-modal">
      <div className="px-5">
        <div className ="d-flex my-3 align-items-center">
          <img src="../../img/helpPage/help_icon.svg" alt="arrow icon" className="help-icon"/>
          <h1 className="px-4"><b>Help</b></h1>
        </div>
        <section className='rules-text'>
          <h1 className="px-3">Game Rules</h1>
          <ul className="mx-4" >
            { gameRules.map( (e, i)=> <li key={i}>{e}</li>) }
          </ul>
        </section>
      </div>
      <Button title="Close" onClick={handleClose} />
    </div>
  );
};

export default Modal;
