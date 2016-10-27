const router = require('express').Router();
const { searchMovies } = require('../services/theMovieDB');
const { searchComics } = require('../services/marvelDB');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/main', (req, res) => {
  res.render('main', {
    movie: res.movie || [],
    comic: res.comic || [],
  });
});

router.get('/searched', searchMovies, searchComics, (req, res) => {
  res.json(res.movie)
  res.render('main', {
    movie: res.movie || [],
    comic: res.comic || [],
  });
});

router.get('/profile', (req, res) => {
  res.render('profile');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});


module.exports = router;

