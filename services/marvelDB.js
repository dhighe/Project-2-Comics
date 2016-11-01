const fetch = require('node-fetch');
const timestamp = require('timestamp');
const md5 = require('js-md5');

const API_URL = 'https://gateway.marvel.com:443/v1/public/comics?';
const API_KEY = process.env.MARVEL_KEY;
const APIP_KEY = process.env.MARVELPRIVATE_KEY;
// will edit to be drop down menu that can increase or decrease the search size
const ts = timestamp();

function searchComics(req, res, next) {
  let hash = md5(ts + APIP_KEY + API_KEY);
  console.log('Comic:', req.query.mpfour);
  fetch(`${API_URL}ts=${ts}&title=${req.query.mpfour}&limit=25&apikey=${API_KEY}&hash=${hash}`)
  .then(r => r.json())
  .then((result) => {
    res.comic = result.data;
    next();
  })
  .catch((err) => {
    res.error = err;
    next();
  });
};

module.exports = { searchComics };
