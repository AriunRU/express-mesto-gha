const User = require('../models/user');

const NOT_FOUND_ERROR_CODE = 404;
const BAD_REQUEST_ERROR_CODE = 400;
const INTERNAL_SERVER_ERROR_CODE = 500;

const createUsers = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.create({
    name, about, avatar, email, password,
  })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: '400 — Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
      }
    });
};

// const login = (req, res) => {

// }

const getUserInfo = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: '404 - Несуществующий ID пользователя' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: '400 — Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
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
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь с таким ID не найден' });
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: '400 — Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
      }
    });
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
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь не найден' });
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: '400 — Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
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
