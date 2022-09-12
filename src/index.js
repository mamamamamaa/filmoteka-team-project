import { trendFilms, filmGenre, searchFilms } from './js/fetchData';
import card from './js/card-template';
import hugeCard from './js/hugeCard-template';
import { searchGenres } from './js/searchGenres';

import toggleModal from './js/modal-film-open-close';
import toggleModal from './js/futer-modal';
import { btnUpToTop, topFunction } from './js/btnUp';

import localStorageApi from './js/localStorageApi';

const refs = {
  cardBox: document.querySelector('.cards-container'),
};

// filmGenre().then(a => {
//   trendFilms().then(e => {
//     refs.cardBox.innerHTML += card(e.data.results, a, searchGenres);
// btnUpToTop();
// topFunction();
//   });
// });

filmGenre().then(a => {
  searchFilms('Fury', 1).then(e => {
    refs.cardBox.innerHTML += card(e.data.results, a, searchGenres);
  });
  btnUpToTop();
  topFunction();
});
