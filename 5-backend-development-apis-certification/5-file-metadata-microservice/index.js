require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer();

const app = express();

app.use(cors());
app.use("/public", express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const file = req.file;
  res.json({
    name: decodeURIComponent(escape(file.originalname)),
    type: file.mimetype,
    size: file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App listening at port :", port);
});
