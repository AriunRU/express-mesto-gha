const { UNAUTHORIZED } = require('../utils/error-constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED; // 401
  }
}

module.exports = UnauthorizedError;
