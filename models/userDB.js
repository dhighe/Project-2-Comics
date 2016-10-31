/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

const { ObjectID }    = require('mongodb');
const { getData }     = require('../lib/database.js');
const bcrypt          = require('bcryptjs');

const SALTROUNDS = 10;

function saveUser(req, res, next) {
  const userObject = {
    username: req.body.username.username,
    email: req.body.username.email,

    // Store hashed password
    password: bcrypt.hashSync(req.body.username.password, SALTROUNDS)
  };

  getData().then((db) => {
    db.collection('user_info')
      .insert(userObject, (userErr, dbUser) => {
        if (userErr) return next(userErr);

        res.username = dbUser;
        db.close();
        return next();
      });
  });
}

function getId(id) {
  return getData().then((db) => {
    const promise = new Promise((resolve, reject) => {
      db.collection('user_info')
        .findOne({ _id: ObjectID(id) }, (infoError, user) => {
          if (infoError) reject(infoError);
          db.close();
          resolve(user);
        });
    });
    return promise;
  });
}

function getUser(username) {
  return getData().then((db) => {
    const promise = new Promise((resolve, reject) => {
      db.collection('user_info')
        .findOne({ username }, (infoError, user) => {
          if (infoError) reject(infoError);
          db.close();
          resolve(user);
        });
    });
    return promise;
  });
}

module.exports = {
  saveUser,
  getId,
  getUser,
};
