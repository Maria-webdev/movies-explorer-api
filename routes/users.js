const userRouter = require('express').Router();
const { userInfoValidation, userLoginValidation, userCreateValidation } = require('../middlewares/validation');

const {
  getCurrentUser,
  updateUser,
  createUser,
  login,
  logout,
} = require('../controllers/users');

userRouter.get('/users/me', userInfoValidation, getCurrentUser);
userRouter.patch('/users/me', userInfoValidation, updateUser);
userRouter.post('/signup', userCreateValidation, createUser);
userRouter.post('/signin', userLoginValidation, login);
userRouter.post('/signout', logout);

module.exports = userRouter;
