const usersRouter = require('express').Router();
const { userInfoValidation } = require('../middlewares/validation');

const {
  getCurrentUser,
  updateUser,
  getUsers,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.patch('/users/me', userInfoValidation, updateUser);

module.exports = usersRouter;
