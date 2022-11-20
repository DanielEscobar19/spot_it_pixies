import '../css/waitingRooms/waitingRoom.scss'

import { useContext, useEffect } from 'react'
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

  useEffect(() => {
    document.title = 'Spot it - Waiting room - guest';
    socket.emit("join-socket-room", roomId);
    if(!roomId > 0){
      navigate("/");
    }
  });

  return (
    <>
      <Layout/>
      { isHost ? 
          <WaitingRoomHost /> 
        :
          <WaitingRoomGuest />
      }
    </>
  )
}
