/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */

const express                     = require('express');
const { authenticateUsers }       = require('../lib/auth');
const marvel                      = require('../models/comicDB');

const profileRouter                 = express.Router();

profileRouter.get('/profile', authenticateUsers, (req, res) => {
  res.render('profile', {
    user: res.username,
  });
});

profileRouter.delete('/:id', marvel.deleteComics, (req, res) => {
  res.redirect('profile');
  });

profileRouter.get('/profile', marvel.getComics, (req, res) => {
  res.render('profile', {
    saved: res.saved || [],
  });
});


module.exports = profileRouter;
