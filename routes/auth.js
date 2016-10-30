const express                   = require('express');
const { saveUser }              = require('../models/userDB.js');
const { authenticateUsers }     = require('../lib/auth');
const { logIn }                 = require('../lib/auth');

const authRouter                = express.Router();

authRouter.get('/', (req, res) => {
  res.render('index');
});

authRouter.post('/loggedIn', logIn, (req, res) => {
  res.redirect('main');
});

authRouter.get('/signup', (req, res) => {
  res.render('signup');
});

authRouter.post('/signedup', saveUser, (req, res) => {
  res.redirect('/');
});

module.exports = authRouter;
