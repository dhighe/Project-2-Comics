const { MongoClient } = require('mongodb');

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

module.exports = {
  saveComics,
};
