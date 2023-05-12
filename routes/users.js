const usersRouter = require('express').Router();

const {
  getUsers, getUserInfo, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

const {
  validateProfileUpdate, validateAvatarUpdate, validateUserId, validateToken,
} = require('../middlewares/validation');

usersRouter.get('/', getUsers);
usersRouter.get('/me', validateToken, getCurrentUser);
usersRouter.get('/:_id', validateUserId, getUserInfo);
usersRouter.patch('/me', validateProfileUpdate, updateUser);
usersRouter.patch('/me/avatar', validateAvatarUpdate, updateAvatar);

module.exports = usersRouter;
