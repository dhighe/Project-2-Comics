/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

const bcrypt    = require('bcryptjs');
const userModel = require('../models/userDB');

function logIn(req, res, next) {
  const userPayload = req.body.username;

  console.log(userPayload.password);
  userModel.getUser(userPayload.username).then((dbUser) => {
    const matches = bcrypt.compareSync(userPayload.password, dbUser.password);

    console.log(dbUser.password, matches);
    if (matches) {
      req.session.userId = dbUser._id;
      res.user = dbUser;
      next();
    } else {
      res.redirect('/');
    }
  });
}

function authenticateUsers(req, res, next) {
  if (req.session.userId) {
    userModel.getId(req.session.userId).then((dbUser) => {
      res.user = dbUser;
      next();
    }).catch(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
}

module.exports = {
  logIn,
  authenticateUsers,
};
