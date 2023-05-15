const BAD_REQUEST_400 = 400;
const UNAUTHORIZED_401 = 401;
const FORBIDDEN_403 = 403;
const NOT_FOUND_404 = 404;
const NOT_UNIQUE_409 = 409;
const SERVER_ERROR_500 = 500;

const REGEX = /(https?:\/\/)(www)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=])*#?$/;

module.exports = {
  BAD_REQUEST_400,
  NOT_FOUND_404,
  FORBIDDEN_403,
  SERVER_ERROR_500,
  NOT_UNIQUE_409,
  UNAUTHORIZED_401,
  REGEX,
};
