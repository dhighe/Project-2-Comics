const { ObjectID } = require('mongodb');
const { getData }    = require('../lib/database.js');

// const dbConnection = 'mongodb://localhost:27017/user_data';

function saveComics(req, res, next) {
  const insertObj = {};
  for(key in req.body) {
    insertObj[key] = req.body[key];
  }
  insertObj.saved.userId = req.session.userId;

  getData().then((db) => {
    db.collection('saved_comics')
    .insert(insertObj.saved, (err, info) => {
      console.log('Error: ', err);
      if (err) return next(err);
      res.saved = info;
      db.close();
      return next();
    });
    return false;
  });
  return false;
}

function getComics(req, res, next) {

  getData().then((db) => {
    console.log('Here are your saved Comics');
    db.collection('saved_comics')
      .find({ userId: { $eq: req.session.userId } })
      .toArray((arrayError, data) => {
        if (arrayError) return next(arrayError);

        res.saved = data;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

function deleteComics(req, res, next) {
  getData().then((db) => {
    db.collection('saved_comics')
      .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, result) => {
        if (removeErr) return next(removeErr);

        res.removed = result;
        db.close();
        next();
      });
      return false;
  });
  return false;
}

function editComics(req, res, next) {
  getData().then((db) => {
    db.collection('saved_comics')
      .findAndModify({ _id: ObjectID(req.params.id) }, [] /* sort */,
      { $set: req.body.saved} , { new: true }, /* options */ (err, saved) => {
        if (err) return next(err);

        // return the data
        res.updated = saved;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

module.exports = {
  saveComics,
  getComics,
  deleteComics,
  editComics
};
