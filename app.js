const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

const moviesRouter = require('./routes/movies');
const userRouter = require('./routes/users');
const { userLoginValidation, userCreateValidation } = require('./middlewares/validation');
const NotFoundError = require('./errors/not-found');

const auth = require('./middlewares/auth');

const { createUser, updateUser, login, getCurrentUser, logOut } = require('./controllers/users');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsAllowed = [
  'https://localhost:3000',
  'https://localhost:3001',
  'http://localhost:3000',
  'http://localhost:3001',
  // 'https://viannat-frontend-mesto.nomoredomains.club',
  // 'http://viannat-frontend-mesto.nomoredomains.club',
  // 'https://viannat-backend-mesto.nomoredomains.club',
  // 'http://viannat-backend-mesto.nomoredomains.club',
  'https://62.84.116.158',
  'http://62.84.116.158',
];

require('dotenv').config();

app.use(cors({
  credentials: true,
  origin(origin, callback) {
    if (corsAllowed.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('CORS Error'));
    }
  },
}));

app.options('*', cors());

app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', userLoginValidation, login);
app.post('/signup', userCreateValidation, createUser);

app.use(requestLogger);

app.use('/movies', auth, moviesRouter);
app.use('/users/me', auth, userRouter);

app.delete('/signout', logOut);

app.use('*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден.')));

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'серверная ошибка' : message,
  });
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});