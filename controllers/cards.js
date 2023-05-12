const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const ForbiddenError = require('../errors/forbidden-error');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные для создания элемента'));
      }
      return next(error);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndDelete(cardId)
    .orFail(new NotFoundError('Переданы некорректные данные для удаления элемента'))
    .then((card) => {
      if (String(card.owner) !== userId) {
        throw new ForbiddenError('Удалить карточку может только владелец.');
      }
      res.send('Карточка успешно удалена.');
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные для создания элемента'));
      }
      return next(error);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      throw new NotFoundError('Элемент запроса не найден');
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные для создания элемента'));
      }
      return next(error);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      throw new NotFoundError('Элемент запроса не найден');
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные для создания элемента'));
      }
      return next(error);
    });
};

module.exports = {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
};
