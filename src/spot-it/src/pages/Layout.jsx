import { useContext, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../css/common/common.scss'
import socket from "../Socket";
import  { GameContext } from '../context/Game'
import Modal from '../components/Modal'

export default function Layout() {
  const {
    setRoomId, setCanJoin, setSessionName, setErrorMessage, setHost,
    setPlayerCardsRemaining, roomId, name
  } = useContext(GameContext);
  const location = useLocation();
  const onGameRoom = location.pathname === "/game-room";
  const noRoomNeed = location.pathname === "/help" || location.pathname === "/credits";
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const hideModal = () => setShow(false);
  const showModal = () => setShow(true);
  const onClick = () => {
    socket.emit("abandon_game", name, roomId);
    setRoomId("");
    setHost("");
    setCanJoin(false);
    setSessionName("");
    setErrorMessage("");
    setPlayerCardsRemaining([]);
  };

  useEffect(() => {
    if(!roomId > 0 && !noRoomNeed){
      navigate("/");
    }
  }, [roomId, navigate, noRoomNeed]);

  return (
    <header>
      <nav className="navbar w-100 navbar-expand-lg bg-light unselectable-text">
        <Link className="navbar-brand homeLogo unselectable-text" to="/home-page" onClick={onClick} replace="true">
          <img src="../../img/common/spot-it-logo.svg" alt="Spot it logo" className="img-fluid ms-4 me-0"/>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon unselectable-text"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end mx-3" id="navbarText">
          <ul className="navbar-nav mr-auto ">
            <li className="nav-item">
              { onGameRoom ?
                  <Link className="nav-link unselectable-text" onClick={showModal}>Help</Link>
                :
                  <Link to="/help" className="nav-link unselectable-text" onClick={onClick}>Help</Link>
              }
              
            </li>
            <li className="nav-item">
              <Link to="/credits" className="nav-link unselectable-text" onClick={onClick}>Credits</Link>
            </li>
          </ul>
        </div>
      </nav>
      { (show && onGameRoom) && <Modal handleClose={hideModal} body="hello world" /> }
    </header>
  )
}
