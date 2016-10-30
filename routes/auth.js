const express = require('express');
const { saveUser }    = require('../models/userDB.js');
const { authenticateUsers }    = require('../lib/auth');
const { logIn }  = require('../lib/auth');

const authRouter = express.Router();

// This is the route that serves your '/' homepage
authRouter.post('/', logIn, (req, res) => {
  res.render('index');
});

// This route serves your `/signup` form
authRouter.delete('/signup', logIn, (req, res) => {
  req.session.userId = null;
  res.render('signup');
});

authRouter.post('/', saveUser, (req, res) => {
  res.redirect('/');
});

module.exports = authRouter;
