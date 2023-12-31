const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const config = require("./config/index");
const app = express();
const appRoutes = require("./routes/index.js");

mongoose.connect(config.db.mongo_url, config.db.options).then(() => {
  console.log("connection to database sucesfull!");
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static("public"));

  app.use("/", appRoutes);

  app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
  });

  app.listen(config.app.port, () => {
    console.log("Server is running at port: ", config.app.port);
  });
});
