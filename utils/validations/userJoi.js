const { celebrate, Joi } = require('celebrate');
const { REGEX } = require('../../constants/constants');

const userRegisterValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REGEX),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const userLoginValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const userInfoValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const userAvatarValidation = celebrate({
  body: Joi.object({
    avatar: Joi.string().pattern(REGEX).required(),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object({
    id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  userRegisterValidation,
  userLoginValidation,
  userInfoValidation,
  userAvatarValidation,
  userIdValidation,
};
