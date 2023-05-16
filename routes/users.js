const usersRouter = require('express').Router();

const {
  getUsers, getUserInfo, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

const {
  validateUpdateProfile, validateUpdateAvatar, validateUserId, validateToken,
} = require('../middlewares/validation');

usersRouter.get('/', getUsers);
usersRouter.get('/me', validateToken, getCurrentUser);
usersRouter.get('/:userId', validateUserId, getUserInfo);
usersRouter.patch('/me', validateUpdateProfile, updateUser);
usersRouter.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = usersRouter;
