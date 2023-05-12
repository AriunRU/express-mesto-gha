const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const NOT_UNIQUE = 409;
const INTERNAL_SERVER_ERROR = 500;

const REGEX = /(https?:\/\/)(www)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=])*#?$/;

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_UNIQUE,
  UNAUTHORIZED,
  REGEX,
};
