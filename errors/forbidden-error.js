const { FORBIDDEN } = require('../utils/utils');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN; // 403
  }
}

module.exports = ForbiddenError;
