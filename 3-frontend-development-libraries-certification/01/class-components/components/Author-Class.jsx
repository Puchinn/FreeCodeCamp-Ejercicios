import React from "react";

class Author extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      padding: "15px 0",
      textAlign: "end",
      fontSize: "18px",
      fontWeight: 200,
    };
    return (
      <p
        id="author"
        style={styles}
        className="animated"
        key={this.props.author}
      >
        - {this.props.author}
      </p>
    );
  }
}

export { Author };
