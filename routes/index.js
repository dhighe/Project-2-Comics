/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

const express                 = require('express');
const { authenticateUsers }   = require('../lib/auth');
const { searchMovies }        = require('../services/theMovieDB');
const { searchComics }        = require('../services/marvelDB');
const marvel                  = require('../models/comicDB');

const indexrouter  = express.Router();

indexrouter.get('/main', (req, res) => {
  res.render('main', {
    user: res.user,
    movie: res.movie || [],
    comic: res.comic || [],
  });
});

indexrouter.get('/searched', authenticateUsers, searchMovies, searchComics, (req, res) => {
  res.render('main', {
    user: res.user,
    movie: res.movie || [],
    comic: res.comic || [],
  });
});

indexrouter.post('/added', marvel.saveComics, (req, res) => {
  res.redirect('back');
});

module.exports = indexrouter;
