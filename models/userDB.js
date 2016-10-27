const { MongoClient } = require('mongodb');

const dbConnection = 'mongodb://localhost:27017/user-data';


function saveUsers(req, res, next) {
  MongoClient.connect(dbConnection, (error, data) => {
    if (error) return next(error);

    data.collection('user_data')
    .insert(req.body.favorite, (err, info) => {
      if (err) return next(err);

      res.saved = info;
    });
    return false;
  });
  return false;
}

module.exports = {
  saveUsers,
};
