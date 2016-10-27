const fetch = require('node-fetch');

const API_URL_M = 'https://api.themoviedb.org/serach/movie?'; // There will be a drop down menu that will switch between movie and tv search
const API_URL_T = 'https://api.themoviedb.org/serach/tv?';
let dropdown = document.getElementById('dropdown').val();
const API_KEY = process.env.THEMOVIEDB_KEY;

function searchMovies(req, res, next) {
  if (dropdown === 'movie') {
    fetch(`${API_URL_M}query=${req.query.search}&api_key=${API_KEY}`)
    .then(r => r.json())
    .then((result) => {
      res.tunes = result;
      next();
    })
    .catch((err) => {
      res.error = err;
      next();
    });
  } else if (dropdown === 'tv') {
    fetch(`${API_URL_T}query=${req.query.search}&api_key=${API_KEY}`)
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
}
module.exports = { searchMovies };
