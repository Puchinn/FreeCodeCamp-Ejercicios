import React from "react";

class ButtonsDiv extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const divStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    };

    const iconStyle = {
      backgroundColor: this.props.color,
      padding: "2px 8px",
      outline: "none",
      border: "none",
      borderRadius: "2px",
      color: "#fff",
      cursor: "pointer",
      marginRight: "6px",
      fontSize: "24px",
    };
    return (
      <div style={divStyle}>
        <div className="buttons">
          <button style={iconStyle}>
            <i className="lab la-twitter"></i>
          </button>
          <button style={iconStyle}>
            <i className="lab la-tumblr"></i>
          </button>
        </div>

        {this.props.children}
      </div>
    );
  }
}

export { ButtonsDiv };
