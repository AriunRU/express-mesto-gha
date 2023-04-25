const Card = require('../models/card');

const NOT_FOUND_ERROR_CODE = 404;
const BAD_REQUEST_ERROR_CODE = 400;
const INTERNAL_SERVER_ERROR_CODE = 500;

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
    });
};

const createCards = (req, res) => {
  const ownerId = req.user.id;
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: ownerId,
  })
    .then((newCard) => {
      if (!newCard) {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: '400 — Переданы некорректные данные.' });
        return;
      }
      res.status(201).send({ data: newCard });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Некорректный запрос' });
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: '404 — Переданы некорректные данные _id для удаления карточки.' });
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
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка запроса не найдена' });
      }
      res.status(200).send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: '400 — Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
      }
    });
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка запроса не найдена. Некорректный ID' });
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Некорректный запрос' });
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports = {
  createCards,
  getCards,
  deleteCard,
  likeCard,
  deleteLike,
};
