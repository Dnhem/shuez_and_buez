const express = require("express");
const db = require("../db");
const router = new express.Router();
const User = require("../models/userModel");
const { ensureCorrectUser, ensureAdmin } = require("../helpers/tokens");

// Admin dashboard to view users
router.get("/", ensureAdmin, async (req, res, next) => {
  try {
    let users = await User.getAll();
    return res.status(200).json({ users });
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", ensureCorrectUser, async (req, res, next) => {
  try {
    let user = await User.getUser(req.params.id);
    return res.status(200).json({ user });
  } catch (err) {
    return next(err);
  }
});

// Update user info
router.put("/:id", ensureCorrectUser, async (req, res, next) => {
  try {
    let user = await User.update(req.params.id, req.body);
    return res.status(200).json({ user });
  } catch (err) {
    return next(err);
  }
});

// TODO: Delete user route

module.exports = router;
