const userRouter = require('express').Router();
const { userInfoValidation } = require('../middlewares/validation');

const {
  getCurrentUser,
  updateUser,
  createUser,
  login,
  logout,
} = require('../controllers/users');

userRouter.get('/users/me', userInfoValidation, getCurrentUser);
userRouter.patch('/users/me', userInfoValidation, updateUser);
userRouter.post('/signup', userInfoValidation, createUser);
userRouter.post('/signin', userInfoValidation, login);
userRouter.post('/signout', userInfoValidation, logout);

module.exports = userRouter;
