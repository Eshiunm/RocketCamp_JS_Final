import path from './apiNext.js';

function products(token) {
  axios
    .get(path.products(token))
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
