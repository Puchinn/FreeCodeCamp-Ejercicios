import React from "react";
import { randomColor } from "./utils";
import { Button } from "./components/Button-Class";
import { Content } from "./components/Content-Class";
import { Author } from "./components/Author-Class";
import { Card } from "./components/Card-Class";
import { ButtonsDiv } from "./components/ButtonsDiv-Class";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      author: "",
    };
    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData() {
    const data = await fetch("https://api.quotable.io/quotes/random").then(
      (d) => d.json()
    );
    const { content, author } = data[0];
    this.setState({
      content,
      author,
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const color = randomColor();
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
          <Content content={this.state.content} />
          <Author author={this.state.author} />
          <ButtonsDiv color={color}>
            <Button onClick={this.fetchData} color={color} />
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
}

export default App;
