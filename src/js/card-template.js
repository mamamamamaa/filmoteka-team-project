import { loaderOff } from './loader';
const NO_POSTER = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcjBqfRNytcTv3gLsDnnoDKhEyqSS9D-TVsA&usqp=CAU`;

export default function (data, genres, searchGenresFn) {
  loaderOff();
  return data
    .map(el => {
      const reliseDate = (el.release_date || el.first_air_date).slice(0, 4);
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
  }).join('');

  //pagination change _cardStyle.scss v1 to .cards-container; v2 to .card-container;
  // pagination(markup); //v1
  // pagination2(markup);   //v2
  // paginationTui(markup);
  // return '';
}
