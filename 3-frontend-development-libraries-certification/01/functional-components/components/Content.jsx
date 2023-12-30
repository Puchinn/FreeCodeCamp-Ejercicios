function Content({ content }) {
  const styles = {
    fontWeight: 500,
    fontSize: "1.75em",
    textAlign: "center",
  };

  return (
    <h1 id="text" style={styles} className="animated" key={content}>
      <i style={{ fontSize: "1.78em" }} className="las la-quote-left"></i>
      {content}
    </h1>
  );
}

export { Content };
