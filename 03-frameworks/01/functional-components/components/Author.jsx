function Author({ author }) {
  const styles = {
    padding: "15px 0",
    textAlign: "end",
    fontSize: "18px",
    fontWeight: 200,
  };

  return (
    <p id="author" style={styles} className="animated" key={author}>
      - {author}
    </p>
  );
}

export { Author };
