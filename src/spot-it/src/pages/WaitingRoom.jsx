import '../css/waitingRooms/waitingRoom.scss'

import { useContext, useEffect } from 'react'
import Layout from './Layout'
import WaitingRoomGuest from '../components/WaitingRoomGuest';
import WaitingRoomHost from '../components/WaitingRoomHost';
import socket from "../Socket";
import  { GameContext } from '../context/Game'


export default function WaitingRoom() {
  const { roomId, host, name } = useContext(GameContext);
  const isHost = host === name;

  useEffect(() => {
    document.title = 'Spot it - Waiting room - guest';
    socket.emit("join-socket-room", roomId);
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
