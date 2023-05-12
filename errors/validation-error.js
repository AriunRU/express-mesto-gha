const { BAD_REQUEST } = require('../utils/utils');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST; // 400
  }
}

module.exports = ValidationError;
