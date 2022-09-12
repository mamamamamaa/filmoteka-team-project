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
  searchForm: document.querySelector('.search__form'),
};

let query = null;

filmGenre().then(genres => {
  trendFilms().then(films => {
    refs.cardBox.innerHTML += card(films.data.results, genres, searchGenres);
    btnUpToTop();
    topFunction();
  });
});

refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  console.log(e.target.search.value);
  if (e.target.search.value === '' || query === e.target.search.value) {
    return;
  }
  query = e.target.search.value;
  e.target.search.value = '';
  filmGenre().then(genres => {
    searchFilms(query, 1).then(films => {
      refs.cardBox.innerHTML = '';
      refs.cardBox.innerHTML += card(films.data.results, genres, searchGenres);
    });
    btnUpToTop();
    topFunction();
  });
});
