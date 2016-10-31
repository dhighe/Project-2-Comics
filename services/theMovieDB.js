const fetch = require('node-fetch');

const API_URL_M = 'http://api.themoviedb.org/3/search/movie?';
const API_URL_T = 'http://api.themoviedb.org/3/search/tv?';
// dropdown allows user to change whether they are searching a movie or tv show
// const choose = document.getElementById('dropdown');
// let dropdown = choose.options[choose.selectedIndex].text;
const API_KEY = process.env.THEMOVIEDB_KEY;

function searchMovies(req, res, next) {
  console.log('Movie:', req.body.mpfour);

  fetch(`${API_URL_M}api_key=${API_KEY}&query='${req.body.mpfour}'`)
  .then(r => r.json())
  .then((result) => {
    res.movie = result.results[0];
    next();
  })
  .catch((err) => {
    res.error = err;
    next();
  });
}
module.exports = { searchMovies };
