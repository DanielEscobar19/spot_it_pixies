import { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../css/common/common.scss'
import socket from "../Socket";
import  { GameContext } from '../context/Game'

export default function Layout() {
  const {
    setRoomId, setCanJoin, setSessionName, setErrorMessage, setHost,
    setPlayerCardsRemaining, roomId, name
  } = useContext(GameContext);

  const onClick = () => {
    socket.emit("abandon_game", name, roomId);
    setRoomId("");
    setHost("");
    setCanJoin(false);
    setSessionName("");
    setErrorMessage("");
    setPlayerCardsRemaining([]);
  };

  return (
    <header>
      <nav className="navbar w-100 navbar-expand-lg bg-light unselectable-text">
        <Link className="navbar-brand homeLogo unselectable-text" to="/home-page" onClick={onClick} replace="true">
          <img src="../../Img/common/spot-it-logo.svg" alt="Spot it logo" className="img-fluid ms-4 me-0"/>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon unselectable-text"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end mx-3" id="navbarText">
          <ul className="navbar-nav mr-auto ">
            <li className="nav-item">
              <Link to="/help" className="nav-link unselectable-text" onClick={onClick}>Help</Link>
            </li>
            <li className="nav-item">
              <Link to="/credits" className="nav-link unselectable-text" onClick={onClick}>Credits</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
