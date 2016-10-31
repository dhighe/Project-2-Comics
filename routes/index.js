/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

const express                 = require('express');
const { authenticateUsers }   = require('../lib/auth');
const { searchMovies }        = require('../services/theMovieDB');
const { searchComics }        = require('../services/marvelDB');
const marvel                  = require('../models/comicDB');

const indexRouter  = express.Router();


const filteredSearch = (req, res, next) => {
  const filterObj = {};
  const search = req.query;

  if ('title' in search) filterObj.feels = new RegExp(`\\b${search.title}`, 'i');

  res.filteredQueryParams = filterObj;
  return next();
};

indexRouter.get('/', authenticateUsers, (req, res) => {
  res.render('main', {
    user: res.username,
    movie: res.movie || [],
    comic: res.comic || [],
  });
});

indexRouter.post('/searched', filteredSearch, authenticateUsers, searchMovies, searchComics, (req, res) => {
  console.log(res.movie)
  res.render('main', {
    user: res.username,
    movie: res.movie,
    comic: res.comic,
  });
});

indexRouter.post('/added', marvel.saveComics, (req, res) => {
  res.redirect('back');
});

module.exports = indexRouter;
