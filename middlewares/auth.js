const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/not-auth');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  const { NODE_ENV, JWT_SECRET = 'super-strong-secret' } = process.env;

  if (!token) {
    throw new NotAuthError('Проблемы с аутентификацией');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
    req.user = payload;
    next();
  } catch (err) {
    throw new NotAuthError('Проблемы с аутентификацией');
  }
};
