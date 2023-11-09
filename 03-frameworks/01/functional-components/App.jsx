import { useState, useEffect } from "react";
import { randomColor } from "./utils";
import { Button } from "./components/Button";
import { Content } from "./components/Content";
import { Author } from "./components/Author";
import { Card } from "./components/Card";
import { ButtonsDiv } from "./components/ButtonsDiv";

function App() {
  const [quote, setQuote] = useState({
    content: "",
    author: "",
  });
  const url = "https://api.quotable.io/quotes/random";
  const color = randomColor();

  const fetchData = async () => {
    const data = await fetch(url).then((d) => d.json());
    const { content, author } = data[0];
    setQuote({
      content,
      author,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const appStyles = {
    backgroundColor: color,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  };

  const pStyles = {
    marginTop: "15px",
    textDecoration: "none",
    color: "#fff",
  };

  return (
    <div style={appStyles}>
      <Card color={color}>
        <Content content={quote.content} />
        <Author author={quote.author} />
        <ButtonsDiv color={color}>
          <Button onClick={fetchData} color={color} />
        </ButtonsDiv>
      </Card>

      <a
        href="https://github.com/Puchinn"
        rel="noreferrer"
        target="_blank"
        style={pStyles}
      >
        by Puchinn
      </a>
    </div>
  );
}

export default App;
