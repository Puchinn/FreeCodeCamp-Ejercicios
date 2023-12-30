import "../styles/_options.css";

function DisplayOptions({ value, onChange }) {
  return (
    <select value={value} onChange={onChange} name="display" id="display">
      <option value="horizontal">Horizontal</option>
      <option value="vertical">Vertical</option>
    </select>
  );
}

function Options({ value, setDisplay, clearText }) {
  const onDisplayChange = (e) => {
    setDisplay(e.target.value);
  };

  return (
    <div id="options">
      <button onClick={clearText}>Clear</button>
      <DisplayOptions value={value} onChange={onDisplayChange} />
    </div>
  );
}

export { Options };
