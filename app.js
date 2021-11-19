const express = require('express');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const app = express();

const router = require('./routes/index');
const { Errors } = require('./errors/errors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = require('./utils/ratelimiter');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsAllowed = [
  'https://localhost:3000',
  'https://localhost:3001',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://api.movies-explorer.nomoredomains.rocks',
  'http://api.movies-explorer.nomoredomains.rocks',
  // 'https://*front*',
  // 'http://*front*',
  'https://51.250.5.159',
  'http://51.250.5.159',
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

app.use(helmet());
app.use(limiter);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(Errors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
