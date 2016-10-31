/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */

const express                      = require('express');
const { authenticateUsers }        = require('../lib/auth');
const marvel                       = require('../models/comicDB');
const { updateUser }               = require('../models/userDB');

const profileRouter                = express.Router();

profileRouter.get('/', authenticateUsers, marvel.getComics,(req, res) => {
  res.render('profile', {
    user: res.username,
    saved: res.saved || [],
  });
});

profileRouter.put('/:id', marvel.editComics, (req, res) => {
  res.redirect('/profile');
});

profileRouter.delete('/:id', marvel.deleteComics, (req, res) => {
  res.redirect('/profile');
  });

module.exports = profileRouter;
