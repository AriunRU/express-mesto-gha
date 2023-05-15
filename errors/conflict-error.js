const { NOT_UNIQUE_409 } = require('../utils/utils');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_UNIQUE_409;
  }
}

module.exports = ConflictError;
