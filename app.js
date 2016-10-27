/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint key-spacing: ["error", { align: "value" }] */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

require('dotenv').config();
const express           = require('express');

const logger            = require('morgan');

const app               = express();
const PORT              = process.argv[2] || process.env.PORT || 3000;
const homeRoute = require('./routes/index');

app.use(logger('dev'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.listen(PORT, () => console.warn('Welcome to port:', PORT));

app.use('/', homeRoute);
