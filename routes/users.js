const usersRouter = require('express').Router();

const {
  getUsers, getUserInfo, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

const {
  validateProfileUpdate, validateAvatarUpdate, validateUserId, validateToken,
} = require('../utils/validation');

usersRouter.get('/', getUsers);
usersRouter.get('/me', validateToken, getCurrentUser);
usersRouter.get('/:userId', validateUserId, getUserInfo);
usersRouter.patch('/me', validateProfileUpdate, updateUser);
usersRouter.patch('/me/avatar', validateAvatarUpdate, updateAvatar);

module.exports = usersRouter;
