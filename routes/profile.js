/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */

const express                     = require('express');
const { authenticateUsers }       = require('../lib/auth');
const marvel                      = require('../models/comicDB');

const usersRouter                 = express.Router();

usersRouter.get('/profile', authenticateUsers, (req, res) => {
  res.render('profile', {
    user: res.user,
  });
});

usersRouter.delete('/:id', marvel.deleteComics, (req, res) => {
  res.redirect('profile');
  });

usersRouter.get('/profile', marvel.getComics, (req, res) => {
  res.render('profile', {
    saved: res.saved || [],
  });
});


module.exports = usersRouter;
