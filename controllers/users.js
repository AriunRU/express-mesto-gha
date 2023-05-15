const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const UnauthorisedError = require('../errors/auth-error');
const ConflictError = require('../errors/conflict-error');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFoundError('Несуществующий ID пользователя');
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные для создания элемента'));
      }
      next(error);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const createUsers = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictError('Пользователь с такой почтой уже зарегистрирован'));
      }
      if (error.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные для создания элемента'));
      }
      return next(error);
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFoundError('Пользователь не найден');
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные для создания элемента'));
      }
      return next(error);
    });
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFoundError('Пользователь не найден');
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные для создания элемента'));
      }
      return next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorisedError('Неправильные почта или пароль.');
      }
      return { matched: bcrypt.compare(password, user.password), user };
    })
    .then(({ matched, user }) => {
      if (!matched) {
        throw new UnauthorisedError('Неправильные почта или пароль');
      }
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};

module.exports = {
  createUsers, getUsers, getUserInfo, updateUser, login, updateAvatar, getCurrentUser,
};
