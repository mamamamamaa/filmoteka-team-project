import { trendFilms, filmGenre, filmInfo } from './js/fetchData';
import card from './js/card-template';
import toggleModal from './js/modal-film-open-close';

import movieId from './js/filmCard-modal/movieId';
import filmCardMarkup from './js/filmCard-modal/modal-film-markup';

const refs = {
  cardBox: document.querySelector('.cards-container'),
  card: document.querySelector('[data-id]'),
  filmCard: document.querySelector('.modal-film'),
};

filmGenre().then(a => {
  trendFilms().then(e => {
    refs.cardBox.innerHTML += card(e.data.results, a);
  });
});

// ++++++++++++++++++++++++++++Вылавливаем ID карточки фильма

refs.cardBox.addEventListener('click', getCardId);

export default function getCardId(evt) {
  let target = evt.target;
  if (target.className === 'cards-container') return;

  let card = evt.target.closest('.card-container');
  let id = card.dataset.id;

  filmInfo(id).then(e => {
    console.log(e);
  });
  return id;
}
