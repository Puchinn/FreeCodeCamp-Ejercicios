import React from "react";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      borderRadius: "3px",
      maxWidth: "500px",
      width: "100%",
      padding: "40px 50px",
      backgroundColor: "#fff",
      color: this.props.color,
    };
    return (
      <div id="quote-box" style={styles}>
        {this.props.children}
      </div>
    );
  }
}

export { Card };
