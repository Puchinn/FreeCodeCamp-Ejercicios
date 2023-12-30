import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "../styles/_modest.css";
import "../styles/_preview.css";

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

function Preview({ text }) {
  const getMarkdownText = () => {
    const rawMarkup = marked.parse(text);
    return { __html: rawMarkup };
  };
  return <div id="preview" dangerouslySetInnerHTML={getMarkdownText()}></div>;
}

export { Preview };
