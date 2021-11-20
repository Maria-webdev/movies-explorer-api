const usersRouter = require('express').Router();
const { userInfoValidation, userLoginValidation, userCreateValidation } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const {
  createUser,
  logIn,
  getCurrentUser,
  updateUser,
  getUsers,
  logOut,
} = require('../controllers/users');

usersRouter.post('/signin', userLoginValidation, logIn);
usersRouter.post('/signup', userCreateValidation, createUser);
usersRouter.delete('/signout', logOut);

usersRouter.get('/users', auth, getUsers);
usersRouter.get('/users/me', auth, getCurrentUser);
usersRouter.patch('/users/me', auth, userInfoValidation, updateUser);

module.exports = usersRouter;
