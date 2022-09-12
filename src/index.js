import { trendFilms, filmGenre, searchFilms } from './js/fetchData';
import card from './js/card-template';
import hugeCard from './js/hugeCard-template';
import { searchGenres } from './js/searchGenres';

import toggleModal from './js/modal-film-open-close';
import localStorageApi from './js/localStorageApi';

const refs = {
  cardBox: document.querySelector('.cards-container'),
  box: document.querySelector('.backdrop is-hidden'),
};

// filmGenre().then(a => {
//   trendFilms().then(e => {
//     refs.cardBox.innerHTML += card(e.data.results, a);
//   });
// });

filmGenre().then(geners => {
  searchFilms('Fury', 1).then(e => {
    refs.cardBox.innerHTML += card(e.data.results, geners, searchGenres);
  });
});
