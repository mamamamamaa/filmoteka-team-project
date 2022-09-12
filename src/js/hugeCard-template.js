import { loaderOff } from './loader';
const NO_POSTER = '/src/images/no-poster.jpg';

export default function (data) {
  loaderOff();
  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : NO_POSTER;
  const genres = [];
  data.genres.filter(e => {
    genres.push(e.name);
  });
  return `
      <img
        src="${poster}"
        alt="${data.title || data.name}"
        class="modal-film__img"
      />
      <div class="modal-film__info-wrapper">
        <h2 class="modal-film__title">${data.title || data.name}</h2>
        <div class="modal-film__info">
          <ul class="modal-film__list list">
            <li class="modal-film__item">Vote / Votes</li>
            <li class="modal-film__item">Popularity</li>
            <li class="modal-film__item">Original Title</li>
            <li class="modal-film__item">Genre</li>
          </ul>
          <ul class="modal-film__list values list">
            <li class="modal-film__item">${data.vote_average} / ${
    data.vote_count
  }</li>
            <li class="modal-film__item">${data.popularity}</li>
            <li class="modal-film__item">${
              data.original_title || data.original_name
            }</li>
            <li class="modal-film__item">${genres.join(', ')}</li>
          </ul>
        </div>
        <h3 class="modal-film__about">About</h3>
        <p class="modal-film__desc">
          ${data.overview}
        </p>
        <div class="modal-film__btn-wrapper">
                    <button class="modal-film__btn js-btnWatched">add to Watched</button>
                    <button class="modal-film__btn js-btnQueue">add to queue</button>
                </div>
      </div>`;
}
