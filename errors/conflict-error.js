const { NOT_UNIQUE } = require('../utils/error-constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_UNIQUE; // 409
  }
}

module.exports = ConflictError;
