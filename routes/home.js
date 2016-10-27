const router = require('express').Router();

const mainRoute = require('../routes/main');
const profileRoute = require('../routes/profile');
const signupRoute = require('../routes/signup');

router.use('/main', mainRoute);
router.use('/profile', profileRoute);
router.use('/signup', signupRoute);


router.get('/', (req, res) => {
  res.render('index');
})

module.exports = router;
