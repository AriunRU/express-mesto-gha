const { BAD_REQUEST_400 } = require('../utils/utils');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_400;
  }
}

module.exports = ValidationError;
