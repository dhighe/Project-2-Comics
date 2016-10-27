const router = require('express').Router();

const homeRoute = require('../routes/home');
const mainRoute = require('../routes/main');
const signupRoute = require('../routes/signup');

router.use('/', homeRoute);
router.use('/main', mainRoute);
router.use('/signup', signupRoute);


router.get('/profile', (req, res) => {
  res.render('profile');
})

module.exports = router;


