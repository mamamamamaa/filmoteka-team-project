import { trendFilms, filmGenre, searchFilms, filmInfo } from './js/fetchData';
import card from './js/card-template';
import hugeCard from './js/hugeCard-template';
import { searchGenres } from './js/searchGenres';

import toggleModal from './js/futer-modal';
import { btnUpToTop, topFunction } from './js/btnUp';

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
};
 
let query = null;

let currentPosition = '';
  function disableScroll (){
    currentPosition = window.scrollY;
    //refs.modal.classList.toggle('is-hidden');
    document.body.style.position = 'fixed';
    document.body.style.top = '-${currentPosition}px'
    document.body.style.width = '100%';
    
    refs.modal.classList.toggle('is-hidden');
  }

  function scroll (){
    refs.modal.classList.toggle('is-hidden');
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo({
      top: currentPosition,
      behavior: 'instant',
    })
    }



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
  // btnUpToTop();
  // topFunction();
}

 btnUpToTop();
 topFunction();
async function searchFilmsFn(query, page) {
  const search = await searchFilms(query, page);
  renderCard(search.data.results);
  pagination.reset(search.data.total_results);
  if (search.data.results.length === 0) {
    refs.tuiContainer.classList.add('is-hidden');
  } else {
    refs.tuiContainer.classList.remove('is-hidden');
  }
  // btnUpToTop();
  // topFunction();
}

async function filmInfoFn(info) {
  console.log(info)

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


refs.closeModalBtn.addEventListener('click', scroll); 
  
const options = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 3,
  page: 1,
};

const pagination = new Pagination(refs.tuiContainer, options);
const page = pagination.getCurrentPage();
refs.tuiContainer.classList.add('is-hidden');

trendFilms(page)
  .then(films => {
    renderCard(films.data.results);
    refs.tuiContainer.classList.remove('is-hidden');
    pagination.reset(films.data.total_results);
    pagination.off('afterMove', updatePagination);
    pagination.on('afterMove', updatePagination);
  })
  .catch(error => console.log(error.message));

async function updatePagination(event) {
  const currentPage = event.page;
  refs.tuiContainer.classList.add('is-hidden');
  await trendFilmsFn(currentPage);
  refs.tuiContainer.classList.remove('is-hidden')

}

refs.searchForm.addEventListener('submit', handleFormSubmit);

refs.cardBox.addEventListener('click', handleCardClick);

