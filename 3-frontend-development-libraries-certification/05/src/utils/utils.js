function formatedTime(hours, minutes, seconds) {
  const minute = hours === 1 ? 60 : minutes < 10 ? `0${minutes}` : minutes;
  const second = seconds < 10 ? `0${seconds}` : seconds;

  return `${minute}:${second}`;
}

function newDateTimer(newTime) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + newTime);
  return date;
}

export { formatedTime, newDateTimer };
