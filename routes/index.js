const router = require('express').Router();
const { searchMovies } = require('../services/theMovieDB');
const { searchComics } = require('../services/marvelDB');
const marvel = require('../models/comicDB');

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
  res.render('main', {
    movie: res.movie || [],
    comic: res.comic || [],
  });
});

router.post('/added', marvel.saveComics, (req, res) => {
  res.redirect;
});

router.get('/profile', marvel.getComics, (req, res) => {
  res.render('profile', {
    saved: res.favorites || [],
  });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
