// Extends normal error
class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

// 404 Not Found error
class NotFoundError extends ExpressError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

// 403 Access Forbidden
class AccessForbiddenError extends ExpressError {
  constructor(message = "Access Forbidden") {
    super(message, 403);
  }
}

// 401 - Unauthorized
class UnauthorizedError extends ExpressError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

// 400 - Bad Request Error
class BadRequestError extends ExpressError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

module.exports = {
  ExpressError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  AccessForbiddenError,
};
