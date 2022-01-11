const HttpStatusCode = require("../utils/error-codes");

class HttpError extends Error {
  constructor(message, statusCode, isOperational) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

class InternalServerError extends HttpError {
  constructor(
    message = "Internal Server Error",
    statusCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true
  ) {
    super(message, statusCode, isOperational);
  }
}

class NotFoundError extends HttpError {
  constructor(
    message = "Not Found",
    statusCode = HttpStatusCode.NOT_FOUND,
    isOperational = true
  ) {
    super(message, statusCode, isOperational);
  }
}

class UnprocessableInputError extends HttpError {
  constructor(
    message = "Invalid inputs passed, please check your data.",
    statusCode = HttpStatusCode.UNPROCESSABLE_INPUT,
    isOperational = true
  ) {
    super(message, statusCode, isOperational);
  }
}

module.exports = {
  InternalServerError: InternalServerError,
  NotFoundError: NotFoundError,
  UnprocessableInputError: UnprocessableInputError,
};
