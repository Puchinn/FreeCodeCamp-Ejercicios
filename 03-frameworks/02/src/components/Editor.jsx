import "../styles/_editor.css";

function Editor({ onChange, value }) {
  return (
    <>
      <textarea
        onChange={onChange}
        value={value}
        name="editor"
        id="editor"
        cols="30"
        rows="10"
      ></textarea>
    </>
  );
}

export { Editor };
