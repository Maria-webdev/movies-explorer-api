const moviesRouter = require('express').Router();
const auth = require('../middlewares/auth');

const { movieValidation, movieIdValidation } = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.use(auth);

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', movieValidation, createMovie);
moviesRouter.delete('/movies/:_id', movieIdValidation, deleteMovie);

module.exports = moviesRouter;
