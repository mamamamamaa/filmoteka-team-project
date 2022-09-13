import { trendFilms, filmGenre, searchFilms, filmInfo } from './js/fetchData';
import card from './js/card-template';
import hugeCard from './js/hugeCard-template';
import { searchGenres } from './js/searchGenres';

import toggleModal from './js/futer-modal';
import { btnUpToTop, topFunction } from './js/btnUp';

import writeLocalStorage from './js/localStorageApi';

const refs = {
  cardBox: document.querySelector('.cards-container'),
  searchForm: document.querySelector('.search__form'),
  modal: document.querySelector('[data-modal]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modaHugelCard: document.querySelector('.modal-film__wrapper'),
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

refs.cardBox.addEventListener('click', evt => {
  if (evt.target.className === 'cards-container') return;
  const card = evt.target.closest('.card-container');
  const id = card.dataset.id;

  refs.cardBox.addEventListener('click', cardModal);
  refs.closeModalBtn.addEventListener('click', cardModal);

  filmInfo(id).then(e => {
    refs.modaHugelCard.innerHTML = '';
    refs.modaHugelCard.insertAdjacentHTML('beforeend', hugeCard(e.data));
    writeLocalStorage(e.data);
  });

  btnUpToTop();
  topFunction();
});

function cardModal() {
  refs.modal.classList.toggle('is-hidden');
}
