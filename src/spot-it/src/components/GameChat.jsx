import React, {useState, useRef, useEffect, useContext} from 'react';
import "../css/components/GameChat.scss";
import ChatMessage from './ChatMessage';
import {v4} from 'uuid';
import  { GameContext } from '../context/Game'
import socket from "../Socket";

export default function GameChat({ gameEvent }) {
  const { name, messagesList, setMessagesList, roomId } = useContext(GameContext);
  
  const [currentMessage, setCurrentMessage] = useState("");
  const chatWindowRef =  useRef(null);

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // 👇️ access input value from state
      // if (event.target.value !== "") {
      //   setMessagesList(previous => {
      //     return [...previous,{playerName: name, content: event.target.value, id : v4()}];
      //   });
      // }
      socket.emit("send-new-event", roomId, {playerName: name, content: event.target.value})
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    chatWindowRef?.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [messagesList])

  return (
    <div id="subseccion-eventos">
        <div id="cuadro-eventos" className="overflow-auto">
            <div id="titulo-eventos">
              <p className="h4">Chat</p>
            </div>
            <div id="textbox-eventos" className="overflow-auto">
              {
                messagesList.map((message) => {
                  return <ChatMessage key={message.id} message={message}/>
                })
              }
              <div ref={chatWindowRef} />
            </div>
            <input onChange={event => setCurrentMessage(event.target.value)} onKeyDown={handleKeyDown} value={currentMessage} type="text" className="my-3" placeholder="Send messages to your friends!"></input>
        </div>
    </div>
  )
}
