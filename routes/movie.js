const movieRouter = require('express').Router();
const { movieValidation } = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', movieValidation, createMovie);
movieRouter.delete('/movies/movieId ', deleteMovie);

module.exports = movieRouter;
