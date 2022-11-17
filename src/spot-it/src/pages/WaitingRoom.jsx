import '../css/waitingRooms/waitingRoom.scss'

import { useContext } from 'react'
import { useNavigate } from 'react-router';
import Layout from './Layout'
import WaitingRoomGuest from '../components/WaitingRoomGuest';
import WaitingRoomHost from '../components/WaitingRoomHost';
import socket from "../Socket";
import  { GameContext } from '../context/Game'


export default function WaitingRoom() {
  const { roomId, host, name } = useContext(GameContext);
  const isHost = host === name;
  const navigate = useNavigate();

  const clickStart= () => {
    socket.emit("start_game", roomId)
    navigate("/game-room");
  }

  return (
    <>
      <Layout/>
      { isHost ? 
          <WaitingRoomHost onClick={clickStart}/> 
        :
          <WaitingRoomGuest onClick={clickStart}/>
      }
    </>
  )
}
