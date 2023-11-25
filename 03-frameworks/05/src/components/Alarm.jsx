import srcAudio from "../assets/marimba-for-smartphone-151931.mp3";

function Alarm({ refElem }) {
  return (
    <div>
      <audio id="beep" ref={refElem} src={srcAudio}></audio>
    </div>
  );
}

export { Alarm };
