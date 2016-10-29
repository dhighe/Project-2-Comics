const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');

const dbConnection = 'mongodb://localhost:27017/user_data';

function saveComics(req, res, next) {
  MongoClient.connect(dbConnection, (error, db) => {
    if (error) return next(error);

    db.collection('saved_comics')
    .insert(req.body.saved, (err, info) => {
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
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);
    console.log('Here are your saved Comics');
    db.collection('saved_comics')
      .find({})
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
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);
    db.collection('saved_comics')
      .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, result) => {
        if (removeErr) return next(removeErr);

        res.removed = result;
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
