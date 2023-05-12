const { FORBIDDEN } = require('../utils/error-constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN; // 403
  }
}

module.exports = ForbiddenError;
