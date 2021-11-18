const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isURL, isEmail } = require('validator');

module.exports.userInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().custom((value) => {
      if (!isEmail(value)) {
        throw new CelebrateError('с email что-то не то');
      }
      return value;
    }),
  }),
});

module.exports.userLoginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value) => {
      if (!isEmail(value)) {
        throw new CelebrateError('с email что-то не то');
      }
      return value;
    }),
    password: Joi.string().required(),
  }),
});

module.exports.userCreateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom((value) => {
      if (!isEmail(value)) {
        throw new CelebrateError('с email что-то не то');
      }
      return value;
    }),
    password: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.movieIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports.movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError('это не ссылка');
      }
      return value;
    }),
    trailer: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError('это не ссылка');
      }
      return value;
    }),
    thumbnail: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError('это не ссылка');
      }
      return value;
    }),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
