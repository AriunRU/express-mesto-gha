const { UNAUTHORIZED_401 } = require('../utils/utils');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_401;
  }
}

module.exports = AuthError;
