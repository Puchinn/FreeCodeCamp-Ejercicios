function Clock({ time, mode }) {
  return (
    <div id="clock">
      <h2>{mode}</h2>
      <p id="time">{time}</p>
    </div>
  );
}

export { Clock };
