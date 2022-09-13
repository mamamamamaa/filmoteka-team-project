import { trendFilms, filmGenre, searchFilms, filmInfo } from './js/fetchData';
import card from './js/card-template';
import hugeCard from './js/hugeCard-template';
import { searchGenres } from './js/searchGenres';

import toggleModal from './js/futer-modal';
import { btnUpToTop, topFunction } from './js/btnUp';

import writeLocalStorage from './js/localStorageApi';

import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

const refs = {
  cardBox: document.querySelector('.cards-container'),
  searchForm: document.querySelector('.search__form'),
  modal: document.querySelector('[data-modal]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modaHugelCard: document.querySelector('.modal-film__wrapper'),
};

let query = null;

function cardModal() {
  refs.modal.classList.toggle('is-hidden');
}

async function renderCard(data) {
  refs.cardBox.innerHTML = '';
  refs.cardBox.innerHTML += card(data, await filmGenre(), searchGenres);
}

async function trendFilmsFn(page) {
  const films = await trendFilms(page);
  renderCard(films.data.results);
  btnUpToTop();
  topFunction();
  return await trendFilms(page);
}

async function searchFilmsFn(query, page) {
  const search = await searchFilms(query, page);
  renderCard(search.data.results);
  btnUpToTop();
  topFunction();
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
  refs.cardBox.addEventListener('click', cardModal);
  refs.closeModalBtn.addEventListener('click', cardModal);
}








const container = document.querySelector('#tui-pagination-container');
const options = {
  totalItems: 0,
  itemsPerPage: 15,
  visiblePages: 5,
  page: 1,
};
const pagination = new Pagination(container, options);
const page = pagination.getCurrentPage();

trendFilmsFn(page)
  .then(films => {
      renderCard(films.data.results);
      pagination.reset(films.data.total_results);
  })
  .catch(error => console.log(error.message));

pagination.on('afterMove', updatePagination);

function updatePagination(event) {
  const currentPage = event.page;
  // console.log(currentPage, event);

  trendFilmsFn(currentPage);
  //  .then(films => {
  //    renderCard(films.data.results);
  //  })
  //  .catch(error => console.log(error.message));
}





refs.searchForm.addEventListener('submit', handleFormSubmit);

refs.cardBox.addEventListener('click', handleCardClick);