function ControlTimer({ nameId, nameTitle, value, controlAction }) {
  return (
    <div className="control">
      <h2 id={`${nameId}-label`}>{nameTitle} length</h2>
      <div>
        <button onClick={() => controlAction("dec")} id={`${nameId}-decrement`}>
          ↓
        </button>
        <button id={`${nameId}-length`}>{value}</button>
        <button onClick={() => controlAction("inc")} id={`${nameId}-increment`}>
          ↑
        </button>
      </div>
    </div>
  );
}

export { ControlTimer };
