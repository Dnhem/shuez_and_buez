const express = require("express");
const router = new express.Router();
const User = require("../models/userModel");
const { createToken } = require("../helpers/tokens");

router.post("/register", async (req, res, next) => {
  try {
    // FIXME: Schema validation
    const newUser = await User.register(req.body);
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    // FIXME: Schema validation
    const user = await User.login(req.body);
    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});
// Link to logout on frontend removes Token from LS.
module.exports = router;
