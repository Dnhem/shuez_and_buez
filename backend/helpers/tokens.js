const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError, ExpressError } = require("../expressError");

const createToken = user => {
  const payload = {
    id: user.id,
    user: user.username,
    isAdmin: user.is_admin || false,
  };
  return jwt.sign(payload, SECRET_KEY);
};
// FRONT END SAVES TOKEN INTO LOCAL STORAGE, FRONT END USES  TOKEN FOR ALL FUTURE REQUESTS. LOGOUT ON FRONT END, FRONT END CLEARS LOCAL STORAGE. REAL WORLD APPS - JWT TOKENS EXPIRE (EX: 48 HOURS). OAUTH2 protocol widely used, uses two tokens - 1) Access Token - auth token shorter duration than refresh.  2) Refresh Token - 7 days.
const verifyToken = (req, res, next) => {
  try {
    let authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
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

module.exports = {
  createToken,
  verifyToken,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUser,
};
