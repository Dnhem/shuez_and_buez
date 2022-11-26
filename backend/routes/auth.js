const express = require("express");
const router = new express.Router();
const User = require("../models/userModel");
const { createToken } = require("../helpers/tokens");
const { authorization } = require("../helpers/tokens");

router.post("/register", async (req, res, next) => {
  try {
    // FIXME: Schema validation
    const newUser = await User.register(req.body);
    const token = createToken(newUser);
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(201)
      .json({ message: "Successfully registered.", access_token: token });
  } catch (err) {
    return next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    // FIXME: Schema validation
    const user = await User.login(req.body);
    const token = createToken(user);
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Successfully logged in.", access_token: token });
  } catch (err) {
    return next(err);
  }
});

router.get("/logout", authorization, async (req, res) => {
  // clear cookie
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out." });
});

// TODO: Checkout page and migrate to appropriate file
router.get("/protected", authorization, async (req, res) => {
  return res.json({ user: { id: req.userId, username: req.userName } });
});

module.exports = router;
