"use strict";
const { NotFoundError } = require("./expressError");
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");
const stripeRoute = require("./routes/stripe");
const { verifyToken } = require("./helpers/tokens");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.static("public"));

// App Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/checkout", stripeRoute);
app.use(verifyToken);
app.use("/users", userRoutes);

/** Handle 404 errors **/
app.use(function(req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler **/
app.use(function(err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(8800, () => {
  console.log("Server started on port 8800");
});

module.exports = app;
