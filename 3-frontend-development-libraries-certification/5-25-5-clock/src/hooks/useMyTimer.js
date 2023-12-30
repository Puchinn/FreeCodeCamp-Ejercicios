import { useTimer } from "react-timer-hook";
import { useEffect } from "react";
import { formatedTime, newDateTimer } from "../utils/utils";

function useMyTimer({ expiryTime, onExpireTime, mode, playAlarm }) {
  const { hours, minutes, seconds, isRunning, resume, restart, pause } =
    useTimer({
      expiryTimestamp: newDateTimer(expiryTime),
      autoStart: false,
      onExpire: () => {
        onExpireTime();
        playAlarm();
      },
    });

  const restartTimer = () => {
    restart(newDateTimer(expiryTime), false);
  };
  const time = formatedTime(hours, minutes, seconds);

  useEffect(() => {
    restart(newDateTimer(expiryTime), false);
  }, [expiryTime]);

  useEffect(() => {
    restart(newDateTimer(expiryTime), true);
  }, [mode]);

  useEffect(() => {
    pause();
  }, []);

  return { time, resume, restartTimer, pause, isRunning };
}

export { useMyTimer };
