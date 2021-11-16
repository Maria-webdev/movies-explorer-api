const userRouter = require('express').Router();
const { userInfoValidation } = require('../middlewares/validation');

const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

userRouter.get('/users/me', userInfoValidation, getCurrentUser);
userRouter.patch('/users/me', userInfoValidation, updateUser);

module.exports = userRouter;
