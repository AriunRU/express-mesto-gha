const { NOT_FOUND } = require('../utils/error-constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND; // 404
  }
}

module.exports = NotFoundError;
