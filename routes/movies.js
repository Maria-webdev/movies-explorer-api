const moviesRouter = require('express').Router();

const { movieValidation } = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', movieValidation, createMovie);
moviesRouter.delete('/movies/:_id ', deleteMovie);

module.exports = moviesRouter;
