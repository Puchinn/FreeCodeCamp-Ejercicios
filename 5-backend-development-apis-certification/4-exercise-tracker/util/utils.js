function checkDate(date) {
  if (date === "" || date === null || date === undefined) {
    return new Date().toDateString();
  }
  if (new Date(date) === "Invalid Date") {
    return new Date().toDateString();
  }
  return new Date(date).toDateString();
}

function exercisesWithoutID(exercisesArray) {
  return exercisesArray.map(({ description, duration, date }) => {
    return {
      description,
      duration,
      date,
    };
  });
}

function queryLogs(logArray, queries = { from, to, limit }) {
  let log = [...logArray];
  if (queries.from) {
    const fromDate = new Date(queries.from);
    log = log.filter((l) => {
      const originalDate = new Date(l.date);
      return originalDate > fromDate;
    });
  }
  if (queries.to) {
    const toDate = new Date(queries.to);
    log = log.filter((l) => {
      const originalDate = new Date(l.date);
      return originalDate < toDate;
    });
  }
  if (queries.limit) {
    log = log.slice(0, queries.limit);
  }
  return log;
}

module.exports = { checkDate, exercisesWithoutID, queryLogs };
