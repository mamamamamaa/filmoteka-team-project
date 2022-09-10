import { loaderOff } from './loader';
import { filmGenre } from './fetchData';

export default function (data) {
  loaderOff();
  return data
    .map(el => {
      const reliseDate = el.release_date
        ? el.release_date.slice(0, 4)
        : 'no data';
      const genres = filmGenre(el.genre_ids);
      console.log(genres);
      return `<div class="card-container">
                  <img src="https://image.tmdb.org/t/p/w500${
                    el.poster_path
                  }" alt="${el.original_title}" class="film-img" />
                  <h2 class="film-title">${el.title || el.name}</h2>
                  <div class="info-container">
                      <span class="film-genres">Actions, Bebra, Others |</span>
                      <span class="film-relise">${reliseDate}</span>
                  </div>
              </div>`;
    })
    .join('');
}
