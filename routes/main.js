const router = require('express').Router();

const homeRoute = require('../routes/home');
const profileRoute = require('../routes/profile');
const signupRoute = require('../routes/signup');

router.use('/', homeRoute);
router.use('/profile', profileRoute);
router.use('/signup', signupRoute);

router.get('/main', (req, res) => {
  res.render('main');
})

module.exports = router;
