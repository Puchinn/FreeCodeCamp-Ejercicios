require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const DNS = require("dns");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(require("body-parser").urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const URLs = [];
let id = 0;

app.post("/api/shorturl", (req, res) => {
  const { url } = req.body;

  if (url === "") {
    return res.json({
      error: "invalid url",
    });
  }

  let parsed_url;
  const modified_url = url.replace(
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
    ""
  );

  try {
    parsed_url = new URL(url);
  } catch (err) {
    return res.json({
      error: "invalid url",
    });
  }

  DNS.lookup(modified_url, (err) => {
    if (err) {
      return res.json({
        error: "invalid url",
      });
    } else {
      const link_exists = URLs.find((l) => l.original_url === url);

      if (link_exists) {
        return res.json({
          original_url: url,
          short_url: id,
        });
      } else {
        ++id;

        const url_object = {
          original_url: url,
          short_url: `${id}`,
        };

        URLs.push(url_object);

        return res.json({
          original_url: url,
          short_url: id,
        });
      }
    }
  });
});

app.get("/api/shorturl/:id", (req, res) => {
  const { id: _id } = req.params;

  const short_link = URLs.find((sl) => sl.short_url === _id);

  if (short_link) {
    return res.redirect(short_link.original_url);
  } else {
    return res.json({
      error: "invalid URL",
    });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
