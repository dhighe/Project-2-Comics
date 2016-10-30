const express = require('express');
const { logIn }  = require('../lib/auth');

const authRouter = express.Router();

// This is the route that serves your '/' homepage
authRouter.get('/', logIn, (req, res) => {
  res.render('index');
});

// This route serves your `/signup` form
authRouter.get('/signup', logIn, (req, res) => {
  req.session.userId = null;
  res.render('signup');
});

module.exports = authRouter;
