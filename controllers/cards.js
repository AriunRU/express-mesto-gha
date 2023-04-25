const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: 'Переданы неверные данные' });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
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
      if (!req.body.name || !req.body.link) {
        res.status(400).send({ message: '400 — Переданы некорректные данные.' });
        return;
      }
      res.status(201).send({ data: newCard });
    })
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: 'Неверные данные, переданные при создании пользователя' });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: '400 — Переданы некорректные данные _id для удаления карточки.' });
        return;
      }
      res.status(500).send({ message: 'Карточка запроса не найдена' });
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
        res.status(404).send({ message: 'Карточка запроса не найдена' });
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: '400 — Переданы некорректные данные _id для удаления карточки.' });
        return;
      }
      res.status(500).send({ message: 'Карточка запроса не найдена' });
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
        res.status(404).send({ message: 'Карточка запроса не найдена. Некорректный ID' });
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: 'Некорректный ID' });
        return;
      }
      res.status(500).send({ message: 'Некорректный ID' });
    });
};

module.exports = {
  createCards,
  getCards,
  deleteCard,
  likeCard,
  deleteLike,
};
