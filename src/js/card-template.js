import { loaderOff } from './loader';
const NO_POSTER = '/src/images/no-poster.jpg';

export default function (data, genres, searchGenresFn) {
  loaderOff();
  return data
    .map(el => {
      const reliseDate = el.release_date ? el.release_date.slice(0, 4) : 'N/A';
      const poster = el.poster_path
        ? `https://image.tmdb.org/t/p/w500${el.poster_path}`
        : NO_POSTER;
      const genreStr = searchGenresFn(genres, el);
      return `<div class="card-container" data-id="${el.id}">
                  <img src="${poster}" alt="${
        el.title || el.name
      }" class="film-img" />
                  <h2 class="film-title">${el.title || el.name}</h2>
                  <div class="info-container">
                      <span class="film-genres">${genreStr} |</span>
                      <span class="film-relise">${reliseDate}</span>
                  </div>
              </div>`;
    })
    .join('');
}
