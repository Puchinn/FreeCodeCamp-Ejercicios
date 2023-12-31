const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  if (!date) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  }

  if (new Date(date).toDateString() !== "Invalid Date") {
    return res.json({
      unix: new Date(date).getTime(),
      utc: new Date(date).toUTCString(),
    });
  }

  if (Number(date) === NaN) {
    return res.json({ error: "Invalid Date" });
  }
  const unix = new Date(Number(date)).getTime();
  const utc = new Date(Number(date)).toUTCString();
  res.json({ unix, utc });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
