import { useState, useRef } from "react";
import { useMyTimer } from "./hooks/useMyTimer";
import { ControlTimer } from "./components/ControlTimer";
import { Alarm } from "./components/Alarm";
import { Clock } from "./components/Clock";

function App() {
  const [state, setState] = useState({
    break_length: 5,
    session_length: 25,
    actual_mode: "session",
  });
  const audioRef = useRef();

  const playAudio = () => {
    audioRef.current.play();
  };
  const stopAudio = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.pause();
  };

  const sessionTime =
    state.actual_mode === "session" ? state.session_length : state.break_length;
  const updateTimer = () => {
    setState({
      ...state,
      actual_mode: state.actual_mode === "session" ? "break" : "session",
    });
  };

  const { isRunning, time, pause, restartTimer, resume } = useMyTimer({
    expiryTime: sessionTime,
    onExpireTime: updateTimer,
    mode: state.actual_mode,
    playAlarm: playAudio,
  });

  const restart = () => {
    restartTimer();
    setState({
      break_length: 5,
      session_length: 25,
      actual_mode: "session",
    });
    stopAudio();
  };

  const controlBreak = (action) => {
    if (isRunning) return;
    if (action === "inc") {
      if (state.break_length + 1 > 60) return;
      setState({
        ...state,
        break_length: state.break_length + 1,
      });
    } else {
      if (state.break_length - 1 < 1) return;
      setState({
        ...state,
        break_length: state.break_length - 1,
      });
    }
  };
  const controlSession = (action) => {
    if (isRunning) return;
    if (action === "inc") {
      if (state.session_length + 1 > 60) return;
      setState({
        ...state,
        session_length: state.session_length + 1,
      });
    } else {
      if (state.session_length - 1 < 1) return;
      setState({
        ...state,
        session_length: state.session_length - 1,
      });
    }
  };

  return (
    <div id="container">
      <h1>25 + 5 Clock</h1>
      <div id="controls">
        <ControlTimer
          nameId={"break"}
          nameTitle={"Break"}
          value={state.break_length}
          controlAction={controlBreak}
        />
        <ControlTimer
          nameId={"session"}
          nameTitle={"Session"}
          value={state.session_length}
          controlAction={controlSession}
        />
      </div>
      <div>
        <Clock time={time} mode={state.actual_mode} />
        <div id="timer-buttons">
          <button id="start_stop" onClick={isRunning ? pause : resume}>
            {isRunning ? "Pause" : "Play"}
          </button>
          <button id="reset" onClick={restart}>
            Restart
          </button>
        </div>
      </div>
      <a href="https://github.com/Puchinn" target="_blank" rel="noreferrer">
        By Puchinn
      </a>
      <Alarm refElem={audioRef} />
    </div>
  );
}

export default App;
