const userRouter = require('express').Router({ credentials: 'include' });
const {
  getUser, getAllUsers, updateUserInfo, getMe,
} = require('../controllers/users');
const {
  userInfoValidation, userAvatarValidation, userIdValidation,
} = require('../utils/validations/userJoi');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getMe);
userRouter.get('/:id', userIdValidation, getUser);
userRouter.patch('/me', userInfoValidation, updateUserInfo);
userRouter.patch('/me/avatar', userAvatarValidation, updateUserInfo);

module.exports = userRouter;
