import { Editor } from "./components/Editor";
import { Preview } from "./components/Preview";
import { Link } from "./components/Link";
import { Options } from "./components/Options";
import { useState } from "react";
import { defaultText } from "./consts";

function App() {
  const [text, setText] = useState(defaultText);
  const [display, setDisplay] = useState("horizontal");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const clear = () => {
    setText("");
  };

  return (
    <div id="App">
      <h1>Markdown Previewer</h1>
      <Link />
      <Options clearText={clear} value={display} setDisplay={setDisplay} />
      <div id="app-main" className={`${display}`}>
        <Editor onChange={onChange} value={text} />
        <Preview text={text} />
      </div>
    </div>
  );
}

export { App };
