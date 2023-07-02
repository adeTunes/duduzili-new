import React, { useEffect, useState } from "react";

function useTimer(start) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (start) {
      intervalId = setInterval(() => {
        setSeconds((v) => v + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      clearInterval(intervalId);
      setSeconds(0);
      setMinutes(0);
    }
  }, [start]);

  useEffect(() => {
    if (seconds === 60) {
      setMinutes((v) => v + 1);
      setSeconds(0);
    }
  }, [seconds]);
  return { minutes, seconds };
}

export default useTimer;
