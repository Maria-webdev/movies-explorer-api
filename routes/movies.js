const moviesRouter = require('express').Router();
const auth = require('../middlewares/auth');

const { movieValidation, movieIdValidation } = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/movies', auth, getMovies);
moviesRouter.post('/movies', auth, movieValidation, createMovie);
moviesRouter.delete('/movies/:_id', auth, movieIdValidation, deleteMovie);

module.exports = moviesRouter;
