import React from "react";

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      fontWeight: 500,
      fontSize: "1.75em",
      textAlign: "center",
    };
    return (
      <h1
        id="text"
        style={styles}
        className="animated"
        key={this.props.content}
      >
        <i style={{ fontSize: "1.78em" }} className="las la-quote-left"></i>
        {this.props.content}
      </h1>
    );
  }
}

export { Content };
