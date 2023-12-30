function Button({ onClick, color }) {
  const styles = {
    backgroundColor: color,
    padding: "8px 12px",
    outline: "none",
    border: "none",
    borderRadius: "2px",
    color: "#fff",
    cursor: "pointer",
  };

  return (
    <button type="button" id="new-quote" onClick={onClick} style={styles}>
      New quote
    </button>
  );
}

export { Button };
