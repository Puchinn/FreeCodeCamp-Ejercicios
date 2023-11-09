function Card({ color, children }) {
  const styles = {
    borderRadius: "3px",
    maxWidth: "500px",
    width: "100%",
    padding: "40px 50px",
    backgroundColor: "#fff",
    color: color,
  };

  return (
    <div id="quote-box" style={styles}>
      {children}
    </div>
  );
}

export { Card };
