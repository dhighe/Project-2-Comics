const router = require('express').Router();

const homeRoute = require('../routes/home');
const mainRoute = require('../routes/main');
const profileRoute = require('../routes/profile');

router.use('/', homeRoute);
router.use('/main', mainRoute);
router.use('/profile', profileRoute);


router.get('/signup', (req, res) => {
  res.render('signup');
})

module.exports = router;
