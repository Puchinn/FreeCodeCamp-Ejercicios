import React from "react";

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      backgroundColor: this.props.color,
      padding: "8px 12px",
      outline: "none",
      border: "none",
      borderRadius: "2px",
      color: "#fff",
      cursor: "pointer",
    };

    return (
      <button
        type="button"
        id="new-quote"
        onClick={this.props.onClick}
        style={styles}
      >
        New quote
      </button>
    );
  }
}

export { Button };
