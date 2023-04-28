const cardsRouter = require('express').Router();
const {
  createCards, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.post('/', createCards);
cardsRouter.get('/', getCards);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
