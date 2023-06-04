const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { CREATED_201 } = require('../constants/constants');
const { generateToken } = require('../utils/token');
const NotFoundError = require('../utils/customError/NotFoundError');

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const payload = { _id: user._id };
    const token = generateToken(payload);
    res
      .cookie('jwt', token, { maxAge: (3600000 * 24 * 7), httpOnly: true, sameSite: true })
      .send({ message: 'Авторизация прошла успешно' });
  } catch (err) {
    next(err);
  }
}

async function getAllUsers(_, res, next) {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      throw new NotFoundError('Пользователей нет');
    }
    res.send({ users });
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('Пользователя с данным id не найдено');
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function getMe(req, res, next) {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });

    res.status(CREATED_201).send(user);
  } catch (err) {
    next(err);
  }
}

async function updateUserInfo(req, res, next) {
  const { _id } = req.user;
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      req.body,
      { new: true, runValidators: true },
    );
    res.send(user);
  } catch (err) {
    next(err);
  }
}

function clearCookie(req, res, next) {
  try {
    res.clearCookie('jwt').send({ message: 'Cookie clear' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
  getMe,
  createUser,
  getUser,
  getAllUsers,
  updateUserInfo,
  clearCookie,
};
