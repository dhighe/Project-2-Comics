const express = require('express');
const { saveUser }    = require('../models/userDB.js');
const { authenticateUsers }    = require('../lib/auth');
const { logIn }  = require('../lib/auth');

const authRouter = express.Router();

authRouter.get('/', (req, res) => {
  res.render('index');
});

authRouter.post('/', logIn, (req, res) => {
  res.render('main');
});

authRouter.delete('/', (req, res) => {
  req.session.userId = null;
  res.render('index');
});

authRouter.get('/signup', (req, res) => {
  res.render('signup');
});

authRouter.post('/', saveUser, (req, res) => {
  res.redirect('/');
});


module.exports = authRouter;
