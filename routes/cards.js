const cardsRouter = require('express').Router();

const {
  createCards, getCards, deleteCard, likeCard, deleteLike,
} = require('../controllers/cards');

cardsRouter.post('/', createCards);
cardsRouter.get('/', getCards);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', deleteLike);

module.exports = cardsRouter;
