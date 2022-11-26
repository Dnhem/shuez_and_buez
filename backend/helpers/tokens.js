const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError, AccessForbiddenError } = require("../expressError");

const createToken = user => {
  const payload = {
    id: user.id,
    user: user.username,
    isAdmin: user.is_admin || false,
  };
  return jwt.sign(payload, SECRET_KEY);
};

const verifyToken = (req, res, next) => {
  try {
    let authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

const ensureLoggedIn = (req, res, next) => {
  if (!res.locals.user) {
    const err = new UnauthorizedError("You are not authorized.");
    return next(err);
  } else {
    return next();
  }
};

const ensureAdmin = (req, res, next) => {
  const currentUser = res.locals.user;
  if (!(currentUser && currentUser.isAdmin)) {
    const err = new UnauthorizedError("You are not authorized.");
    return next(err);
  } else {
    return next();
  }
};

const ensureCorrectUser = (req, res, next) => {
  const currentUser = res.locals.user;
  if (currentUser.id === +req.params.id || currentUser.isAdmin) {
    return next(err);
  } else {
    const err = new UnauthorizedError("You are not authorized.");
    return next(err);
  }
};

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  const err = new AccessForbiddenError();
  if (!token) return next(err);
  try {
    const data = jwt.verify(token, SECRET_KEY);
    console.log(data);
    req.userId = data.id;
    req.userName = data.user;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createToken,
  verifyToken,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUser,
  authorization,
};
