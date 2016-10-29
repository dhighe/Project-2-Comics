const MongoClient = require('mongodb');

const connectionURL = process.env.MONGOLAB_URI || 'mongodb://localhost/user_data';

function getData() {
  return MongoClient.connect(connectionURL);
}

module.exports = {
  getData
};
