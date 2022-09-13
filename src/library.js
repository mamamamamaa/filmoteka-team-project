import toggleModal from './js/futer-modal';
import writeLocalStorage from './js/localStorageApi';
import { trendFilms, filmGenre, searchFilms, filmInfo } from './js/fetchData';
import hugeCard from './js/hugeCard-template';


const refs = {
    watched: document.querySelector('.watched'),
    queue: document.querySelector('.queue'),
    container: document.querySelector('.cards-container'),
    modaHugelCard: document.querySelector('.modal-film__wrapper'),
    modal: document.querySelector('[data-modal]'),

}

const getKey = key => {
    try {
        const serializedState = localStorage.getItem(key);
        // console.log(serializedState);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
};

const dataWatchedLocalStorage = getKey('watched');
const dataQueueLocalStorage = getKey('queue');

refs.queue.addEventListener('click', markupLibQueue);
refs.watched.addEventListener('click', markupLibWatched);
refs.container.addEventListener('click', handleCardClick);

markupLibWatched();

function markupLibQueue() {
    refs.container.innerHTML = "";

    if (!dataQueueLocalStorage) {
        refs.container.innerHTML = "";
        console.log('no data');
        // if (!document.querySelector('.libraafterbeginpty')) {
        refs.container.insertAdjacentHTML('afterbegin', '<p class="library__empty">Oops! There`s nothing to show there!</p>')
        // }
        // refs.container.insertAdjacentHTML('afterend', '<p class="library__empty">Oops! There`s nothing to show there!</p>')
    }
    else {
        console.log('done data');
        const dataQueueFromLocalStorage = dataQueueLocalStorage.map(({ id, date, genres, title, poster, vote
        }) => {
            const genresString = genres.join(", ")
            const reliseDate = date.slice(0, 4);
            return `<div class="card-container" data-id="${id}">
                  <img src="https://image.tmdb.org/t/p/w500${poster}" alt="${title
                }" class="film-img" />
                  <h2 class="film-title">${title}</h2>
                  <div class="info-container">
                      <span class="film-genres">${genresString} |</span>
                      <span class="film-relise">${reliseDate}</span>
                  </div>
              </div>`;
        })
            .join('');
        console.log(dataQueueFromLocalStorage);
        refs.container.insertAdjacentHTML('beforeend', dataQueueFromLocalStorage)
    }
}


function markupLibWatched() {
    refs.container.innerHTML = "";
    if (!dataWatchedLocalStorage) {
        refs.container.innerHTML = "";
        // if (!document.querySelector('.library__empty')) {
        refs.container.insertAdjacentHTML('afterbegin', '<p class="library__empty">Oops! There`cos nothing to show there!</p>')
        // }
        // console.log('no data');
        // refs.container.insertAdjacentHTML('afterend', '<p class="library__empty">Oops! Theres nothing to show there!</p>')
    }
    else {
        console.log('done data');
        const dataWatchedFromLocalStorage = dataWatchedLocalStorage.map(({ id, date, genres, title, poster, vote
        }) => {
            const genresString = genres.join(", ")
            const reliseDate = date.slice(0, 4);
            return `<div class="card-container" data-id="${id}">
                  <img src="https://image.tmdb.org/t/p/w500${poster}" alt="${title
                }" class="film-img" />
                  <h2 class="film-title">${title}</h2>
                  <div class="info-container">
                      <span class="film-genres">${genresString} |</span>
                      <span class="film-relise">${reliseDate}</span>
                  </div>
              </div>`;
        })
            .join('');
        console.log(dataWatchedFromLocalStorage);
        refs.container.insertAdjacentHTML('beforeend', dataWatchedFromLocalStorage)
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
}

async function filmInfoFn(info) {
    refs.modaHugelCard.innerHTML = '';
    refs.modaHugelCard.insertAdjacentHTML('beforeend', hugeCard(info.data));
    writeLocalStorage(info.data);
}

function cardModal() {
    refs.modal.classList.toggle('is-hidden');
}

