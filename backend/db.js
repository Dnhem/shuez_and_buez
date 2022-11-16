"use strict";

const { Client } = require("pg");

let DB_URI;

// Allow alternate DB for testing
if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///shueznbuez_test";
} else {
  DB_URI = "postgresql:///shueznbuez";
}

let db = new Client({
  connectionString: DB_URI,
});

db.connect();

module.exports = db;
