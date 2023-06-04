const { celebrate, Joi } = require('celebrate');
const { REGEX } = require('../../constants/constants');

const cardDataValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(REGEX).required(),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object({
    id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  cardDataValidation,
  cardIdValidation,
};
