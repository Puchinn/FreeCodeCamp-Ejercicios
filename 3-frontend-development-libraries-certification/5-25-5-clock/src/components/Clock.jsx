function Clock({ time, mode }) {
  return (
    <div id="clock">
      <h2 id="timer-label">{mode}</h2>
      <p id="time-left">{time}</p>
    </div>
  );
}

export { Clock };
