const router = require('express').Router();
const mongoose = require('mongoose');

const NotFoundError = require('../errors/not-found');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/', moviesRouter);
router.use('/', usersRouter);

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден.');
});

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

module.exports = router;