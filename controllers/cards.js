const { ValidationError } = require('mongoose').Error;
const Card = require('../models/card');

const NOT_FOUND_ERROR_CODE = 404;
const BAD_REQUEST_ERROR_CODE = 400;
const INTERNAL_SERVER_ERROR_CODE = 500;

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
    })
    .catch(next);
};

const createCards = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Некорректный запрос' });
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: '404 — Переданы некорректные данные для удаления элемента' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Некорректный запрос' });
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Элемент запроса не найден' });
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: '400 — Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Элемент запроса не найден' });
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Некорректный запрос' });
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
      }
    })
    .catch(next);
};

module.exports = {
  createCards,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
