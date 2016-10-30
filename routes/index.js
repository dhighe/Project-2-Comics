const express              = require('express');
const { searchMovies }    = require('../services/theMovieDB');
const { searchComics }    = require('../services/marvelDB');
const marvel              = require('../models/comicDB');

const indexrouter  = express.Router();

indexrouter.get('/main', (req, res) => {
  res.render('main', {
    movie: res.movie || [],
    comic: res.comic || [],
  });
});

indexrouter.get('/searched', searchMovies, searchComics, (req, res) => {
  res.render('main', {
    movie: res.movie || [],
    comic: res.comic || [],
  });
});

indexrouter.post('/added', marvel.saveComics, (req, res) => {
  res.redirect('back');
});

module.exports = indexrouter;
