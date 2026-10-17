"use strict";

require("dotenv").config();

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;
const PORT = process.env.PORT || 8800;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const DB_URL = process.env.DATABASE_URL || "postgresql:///shueznbuez";
const SECRET_KEY = process.env.SECRET_KEY;
const STRIPE_KEY = process.env.STRIPE_KEY;

module.exports = {
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
  STRIPE_KEY,
  PORT,
  CLIENT_URL,
  DB_URL,
};
