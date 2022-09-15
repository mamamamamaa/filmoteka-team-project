import { trendFilms, filmGenre, searchFilms, filmInfo } from './js/fetchData';
import { searchGenres } from './js/searchGenres';
import card from './js/card-template';
import hugeCard from './js/hugeCard-template';

import toggleModal from './js/futer-modal';

import { btnUpToTop, topFunction } from './js/btnUp';
import { disableScroll, scroll } from './js/scrollFns';

import { loaderOff } from './js/loader';

import writeLocalStorage from './js/localStorageApi';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const refs = {
  cardBox: document.querySelector('.cards-container'),
  searchForm: document.querySelector('.search__form'),
  modal: document.querySelector('[data-modal]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modaHugelCard: document.querySelector('.modal-film__wrapper'),
  tuiContainer: document.querySelector('#tui-pagination-container'),
  searchNotify: document.querySelector('.search__correct'),
};

let query = null;

const options = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 3,
  page: 1,
  usageStatistics: false,
};

const pagination = new Pagination(refs.tuiContainer, options);
// const pageCurrent = pagination.getCurrentPage();

async function renderCard(data) {
  refs.cardBox.innerHTML = '';
  refs.cardBox.innerHTML += card(data, await filmGenre(), searchGenres);
}

async function trendFilmsFn(page) {
  const films = await trendFilms(page);
  renderCard(films.data.results);
}

async function searchFilmsFn(query, page) {
  const search = await searchFilms(query, page);
  if (search.data.results.length === 0) {
    loaderOff();
    refs.searchNotify.classList.remove('is-hidden');
    return;
  }
  refs.searchNotify.classList.add('is-hidden');
  renderCard(search.data.results);
  pagination.reset(search.data.total_results);
  if (search.data.results.length === 0) {
    refs.tuiContainer.classList.add('is-hidden');
  } else {
    refs.tuiContainer.classList.remove('is-hidden');
  }
}

async function filmInfoFn(info) {
  refs.modaHugelCard.innerHTML = '';
  refs.modaHugelCard.insertAdjacentHTML('beforeend', hugeCard(info.data));
  writeLocalStorage(info.data);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  if (e.target.search.value === '' || query === e.target.search.value) {
    return;
  }
  query = e.target.search.value;
  e.target.search.value = '';
  await searchFilmsFn(query, 1);
}

async function handleCardClick(e) {
  if (e.target.className === 'cards-container') {
    return;
  }

  const card = e.target.closest('.card-container');
  const id = card.dataset.id;
  const info = await filmInfo(id);
  filmInfoFn(info);
  disableScroll();
}

async function updatePagination({page}) {
  localStorage.setItem(
    'paginationTuiCurrentPage',
    JSON.stringify(page)
  );
  refs.tuiContainer.classList.add('is-hidden');
  await trendFilmsFn(page);
  refs.tuiContainer.classList.remove('is-hidden');
}

function getItemLS() {
 return Number(localStorage.getItem('paginationTuiCurrentPage')) || 1;
}

btnUpToTop();
topFunction();

trendFilms(getItemLS())
  .then(films => {
    pagination.reset(films.data.total_results);
    pagination.movePageTo(getItemLS());
    renderCard(films.data.results);
    refs.tuiContainer.classList.remove('is-hidden');
    pagination.off('afterMove', updatePagination);
    pagination.on('afterMove', updatePagination);
  })
  .catch(error => console.log(error.message));

refs.closeModalBtn.addEventListener('click', scroll);

refs.tuiContainer.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', handleFormSubmit);

refs.cardBox.addEventListener('click', handleCardClick);
