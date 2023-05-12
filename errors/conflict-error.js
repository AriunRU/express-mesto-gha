const { NOT_UNIQUE } = require('../utils/utils');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_UNIQUE; // 409
  }
}

module.exports = ConflictError;
