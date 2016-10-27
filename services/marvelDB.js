const fetch = require('node-fetch');

const API_URL = 'https://gateway.marvel.com:443/v1/public/comics?';
const API_KEY = process.env.MARVEL_KEY;
const placeholder = 10; // will edit to be drop down menu that can increase or decrease the search size

function searchComics(req, res, next) {
  fetch(`${API_URL}format=comic&formatType=comic&title=${req.query.search}&hasDigitalIssue=true&orderBy=focDate&limit=${placeholder}&apikey=${API_KEY}`)
  .then(r => r.json())
  .then((result) => {
    res.tunes = result;
    next();
  })
  .catch((err) => {
    res.error = err;
    next();
  });
}

module.exports = { searchComics };
