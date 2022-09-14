import toggleModal from './js/futer-modal';
import writeLocalStorage from './js/localStorageApi';
import { filmInfo } from './js/fetchData';
import hugeCard from './js/hugeCard-template';
import { btnUpToTop, topFunction } from './js/btnUp';

const refs = {
  watched: document.querySelector('.watched'),
  queue: document.querySelector('.queue'),
  container: document.querySelector('.cards-container'),
  modaHugelCard: document.querySelector('.modal-film__wrapper'),
  modal: document.querySelector('[data-modal]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
};

const getKey = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const dataWatchedLocalStorage = getKey('watched');
const dataQueueLocalStorage = getKey('queue');

refs.queue.addEventListener('click', markupLibQueue);
refs.watched.addEventListener('click', markupLibWatched);
refs.container.addEventListener('click', handleCardClick);

markupLibWatched();

function markupLibQueue() {
  refs.queue.classList.add('active');
  refs.watched.classList.remove('active');

  refs.container.innerHTML = '';

  if (!dataQueueLocalStorage) {
    refs.container.innerHTML = '';
    refs.container.insertAdjacentHTML(
      'afterbegin',
      '<p class="library__empty">Oops! There`s nothing to show there!</p>'
    );
  } else {
    const dataQueueFromLocalStorage = dataQueueLocalStorage
      .map(({ id, date, genres, title, poster, vote }) => {
        const genresString = genres.join(', ');
        const reliseDate = date.slice(0, 4);
        const voteToFix = vote.toPrecision(2);
        return `<div class="card-container" data-id="${id}">
                  <img src="https://image.tmdb.org/t/p/w500${poster}" alt="${title}" class="film-img" />
                  <h2 class="film-title">${title}</h2>
                  <div class="info-container">
                      <span class="film-genres">${genresString} |</span>
                      <span class="film-relise">${reliseDate}</span>
                      <span class="lib-modal-film__vote">${voteToFix}</span>
                  </div>
              </div>`;
      })
      .join('');
    refs.container.insertAdjacentHTML('beforeend', dataQueueFromLocalStorage);
  }
}

function markupLibWatched() {
  refs.watched.classList.add('active');
  refs.queue.classList.remove('active');

  refs.container.innerHTML = '';
  if (!dataWatchedLocalStorage) {
    refs.container.innerHTML = '';
    refs.container.insertAdjacentHTML(
      'afterbegin',
      '<p class="library__empty">Oops! There`cos nothing to show there!</p>'
    );
  } else {
    const dataWatchedFromLocalStorage = dataWatchedLocalStorage
      .map(({ id, date, genres, title, poster, vote }) => {
        const genresString =
          genres.length === 1
            ? `${genres[0]}`
            : genres.length === 2
            ? `${genres[0]}, ${genres[1]}`
            : genres.length > 2
            ? `${genres[0]}, ${genres[1]}, Other`
            : '';
        const reliseDate = date.slice(0, 4);
        const voteToFix = vote.toPrecision(2);
        return `<div class="card-container" data-id="${id}">
                  <img src="https://image.tmdb.org/t/p/w500${poster}" alt="${title}" class="film-img" />
                  <h2 class="film-title">${title}</h2>
                  <div class="info-container">
                      <span class="film-genres">${genresString} |</span>
                      <span class="film-relise">${reliseDate}</span>
                      <span class="lib-modal-film__vote">${voteToFix}</span>
                  </div>
              </div>`;
      })
      .join('');
    refs.container.insertAdjacentHTML('beforeend', dataWatchedFromLocalStorage);
  }
 
}
  

async function handleCardClick(e) {
  if (e.target.className === 'cards-container') {
    return;
  }

  const card = e.target.closest('.card-container');
  const id = card.dataset.id;
  const info = await filmInfo(id);
  filmInfoFn(info);
  refs.container.addEventListener('click', cardModal);
  refs.closeModalBtn.addEventListener('click', cardModal); 
  console.log(refs.closeModalBtn);
console.log(info);
console.log(id);
console.log(card);
  
}

btnUpToTop();
 topFunction();

async function filmInfoFn(info) {
  refs.modaHugelCard.innerHTML = '';
  refs.modaHugelCard.insertAdjacentHTML('beforeend', hugeCard(info.data));
  writeLocalStorage(info.data);
}

function cardModal() {
  refs.modal.classList.toggle('is-hidden');
}
