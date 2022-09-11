import { trendFilms, searchFilms } from './js/fetchData';
import card from './js/card-template';

const refs = {
  cardBox: document.querySelector('.cards-container'),
};

trendFilms().then(e => {
  refs.cardBox.innerHTML += card(e.data.results);
});

// searchFilms('Fury', 1).then(e => {
//   console.log(e);
//   refs.cardBox.innerHTML += card(e.data.results);
// });
