require("dotenv").config();

const { MONGODB_URL, PORT, DB_NAME } = process.env;
const MONGODB_URL_TEST = "mongodb://localhost:27017";

const config = {
  db: {
    mongo_url: MONGODB_URL || MONGODB_URL_TEST,
    options: {
      dbName: DB_NAME || "test",
    },
  },
  app: {
    port: PORT || 3000,
  },
};

module.exports = config;
