"use strict";

const { Pool } = require("pg");
const { DB_URL } = require("./config");

let DB_URI;

// Allow alternate DB for testing
if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///shueznbuez_test";
} else {
  DB_URI = DB_URL;
}

// A pool opens a fresh connection when the database drops an idle one
// (Neon does this whenever it scales to zero)
const db = new Pool({
  connectionString: DB_URI,
});

db.on("error", err => {
  console.error("Idle database connection error:", err.message);
});

module.exports = db;
