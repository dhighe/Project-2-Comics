/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint key-spacing: ["error", { align: "value" }] */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

require('dotenv').config();
const express           = require('express');
const logger            = require('morgan');
const app               = express();
const PORT              = process.env.PORT || 3000;
const homeRoute = require('./routes/home');
const mainRoute = require('./routes/main');
const profileRoute = require('./routes/profile');
const signupRoute = require('./routes/signup');

app.use(logger('dev'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.listen(PORT, () => console.warn('Welcome to port:', PORT));

app.use('/', homeRoute);
app.use('/main', mainRoute);
app.use('/profile', profileRoute);
app.use('/signup', signupRoute);
