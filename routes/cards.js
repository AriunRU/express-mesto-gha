const cardRouter = require('express').Router();
const {
  getAllCards, deleteCard, createCard, likeSwitch,
} = require('../controllers/cards');
const { cardDataValidation, cardIdValidation } = require('../utils/validations/cardsJoi');

cardRouter.get('/', getAllCards);
cardRouter.post('/', cardDataValidation, createCard);
cardRouter.delete('/:id', cardIdValidation, deleteCard);
cardRouter.put('/:id/likes', cardIdValidation, likeSwitch);
cardRouter.delete('/:id/likes', cardIdValidation, likeSwitch);

module.exports = cardRouter;
