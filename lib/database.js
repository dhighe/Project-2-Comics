const MongoClient = require('mongodb');

const connectionURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/user_data';

function getData() {
  return MongoClient.connect(connectionURL);
}

module.exports = {
  getData
};
