/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint key-spacing: ["error", { align: "value" }] */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

require('dotenv').config();
const express               = require('express');
const logger                = require('morgan');
const path                  = require('path');
const bodyParser            = require('body-parser');
const session               = require('express-session');
const cookieParser          = require('cookie-parser');
const methodOverride        = require('method-override');
const authRouter            = require('./routes/auth');
const indexRouter           = require('./routes/index');
const profileRouter         = require('./routes/profile');

const app                   = express();
const PORT                  = process.argv[2] || process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));
app.use(cookieParser());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'SECRET',
}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', authRouter);
app.use('/main', indexRouter);
app.use('/profile', profileRouter);

app.listen(PORT, () => console.warn('Welcome to port:', PORT));

app.use(express.static(path.join(__dirname, 'public')));

