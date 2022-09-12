import { loaderOff } from './loader';
const NO_POSTER = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcjBqfRNytcTv3gLsDnnoDKhEyqSS9D-TVsA&usqp=CAU`;

export default function (data, genres, searchGenresFn) {
  loaderOff();
  return data
    .map(el => {
      console.log(el);
      const reliseDate = el.release_date ? el.release_date.slice(0, 4) : 'N/A';
      NO_POSTER = el.poster_path
        ? `https://image.tmdb.org/t/p/w500${el.poster_path}`
        : NO_POSTER;
      const genreStr = searchGenresFn(genres, el);
      return `<div class="card-container" data-id="${el.id}">
                  <img src="${NO_POSTER}" alt="${
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
