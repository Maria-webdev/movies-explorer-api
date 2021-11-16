const Movie = require('../models/movie');
const Forbidden = require('../errors/forbidden');
const NotFoundError = require('../errors/not-found');
const BadRequestError = require('../errors/bad-request');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const id = req.user._id;
  Card.findById(req.params._id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      if (card.owner.toString() !== id) {
        throw new Forbidden('Нет доступа для удаления карточки');
      } else {
        card.remove()
          .then(() => res.send({ message: 'deleted' }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id, {
      $addToSet: { likes: req.user._id },
    }, { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id, {
      $pull: { likes: req.user._id },
    }, { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else {
        next(err);
      }
    })
    .catch(next);
};
