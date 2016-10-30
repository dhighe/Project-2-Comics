/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */

const express           = require('express');
const { createUser }    = require('../models/userDB.js');
const { authenticate }  = require('../lib/auth');
const marvel            = require('../models/comicDB');

const usersRouter  = express.Router();

usersRouter.delete('/:id', marvel.deleteComics, (req, res) => {
  res.redirect('profile');
  });

usersRouter.get('/profile', marvel.getComics, (req, res) => {
  res.render('profile', {
    saved: res.saved || [],
  });
});


module.exports = usersRouter;
