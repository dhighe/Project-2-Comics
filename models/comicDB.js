const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');

const dbConnection = 'mongodb://localhost:27017/user-data';

function saveComics(req, res, next) {
  MongoClient.connect(dbConnection, (error, data) => {
    if (error) return next(error);

    data.collection('saved_comics')
    .insert(req.body.favorite, (err, info) => {
      if (err) return next(err);

      res.saved = info;
    });
    return false;
  });
  return false;
}

function getComics(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

    db.collection('saved_comics')
      .find({})
      .sort({ Title: 1 })
      .toArray((arrayError, data) => {
        if (arrayError) return next(arrayError);

        res.favorites = data;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

function deleteComics(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

    db.collection('saved_comics')
    .findAndRemove({ _id: ObjectID(req.params.id) }, (removeError, info) => {
      if (removeError) return next(removeError);

      res.removed = info;
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
};
