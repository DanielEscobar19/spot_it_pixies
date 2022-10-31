import React from 'react';
import moment from 'moment';
import { useState } from 'react';

export default function ChatMessage({message}) {
  const [time] = useState(moment().format("hh:mm"));
  return (
    <>
      <p className="h6 evento">{time}  {message.playerName}: {message.content}</p>
    </>
  )
}
