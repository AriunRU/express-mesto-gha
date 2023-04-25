const User = require('../models/user');

const createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(() => {
      res.status(400).send({ message: '400 — Переданы некорректные данные при создании пользователя.' });
    });
};

const getUserInfo = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: '404 - Несуществующий ID пользователя' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: '400 — Некорректный ID пользователя' });
        return;
      }
      res.status(404).send(err);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: 'Отправлены неверные данные' });
        return;
      }
      res.status(500).send({ message: 'Отправлены неверные данные' });
    });
};

const updateUser = (req, res) => {
  const userId = req.user.id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: `Пользователь с ID ${userId} не найден` });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: '400 — Переданы некорректные данные при создании пользователя.' });
      }
    });
  res.status(400).send({ message: 'Пользователь не найден' });
};

const updateAvatar = (req, res) => {
  const userId = req.user.id;

  const { avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: 'Пользователь не найден' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: 'Отправлены некорректные данные' });
      }
    });
};

module.exports = {
  createUsers,
  getUsers,
  getUserInfo,
  updateUser,
  updateAvatar,
};
