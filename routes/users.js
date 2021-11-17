const usersRouter = require('express').Router();
const { userInfoValidation } = require('../middlewares/validation');

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

usersRouter.get('/users/me', getCurrentUser);
usersRouter.patch('/users/me', userInfoValidation, updateUser);

module.exports = usersRouter;
