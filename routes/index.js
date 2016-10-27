const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/main', (req, res) => {
  res.render('main');
});

router.get('/profile', (req, res) => {
  res.render('profile');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});


module.exports = router;
