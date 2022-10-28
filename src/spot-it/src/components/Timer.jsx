import React from 'react';
import { useState, useEffect } from 'react';

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let time = 0;
    setInterval(increment, 1000);

    function increment() {
      time += 1;
      setHours(Math.floor((time / 60 / 60) % 24));
      setMinutes(Math.floor(time / 60 % 60));
      setSeconds(Math.floor(time  % 60));
    }
    
  }, []);

  return (
    <div className="timer" role="timer">
      {hours < 10 ? "0" + hours : hours}:{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
    </div>
  );
};

export default Timer;
