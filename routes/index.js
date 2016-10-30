/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

const express                 = require('express');
const { authenticateUsers }   = require('../lib/auth');
const { searchMovies }        = require('../services/theMovieDB');
const { searchComics }        = require('../services/marvelDB');
const marvel                  = require('../models/comicDB');

const indexRouter  = express.Router();

indexRouter.get('/', authenticateUsers, (req, res) => {
  res.render('main', {
    user: res.username,
    movie: res.movie || [],
    comic: res.comic || [],
  });
});

indexRouter.post('/searched', authenticateUsers, searchMovies, searchComics, (req, res) => {
  res.render('main', {
    user: res.username,
    movie: res.movie || [],
    comic: res.comic || [],
  });
});

indexRouter.post('/added', marvel.saveComics, (req, res) => {
  res.redirect('back');
});

module.exports = indexRouter;
