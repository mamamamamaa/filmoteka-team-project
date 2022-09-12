import { loaderOff } from './loader';
const NO_POSTER = '/src/images/no-poster.jpg';
import { pagination } from './pagination';
import { pagination2 } from './pagination2';


export default function (data, genres) {
  loaderOff();
  const markup = data.map(el => {
    const reliseDate = el.release_date ? el.release_date.slice(0, 4) : 'N/A';
    const poster = el.poster_path
      ? `https://image.tmdb.org/t/p/w500${el.poster_path}`
      : NO_POSTER;
    let genre = [];
    for (const id of el.genre_ids) {
      genres.data.genres.forEach(e => {
        if (e.id === id) {
          genre.push(e.name);
        }
      });
    }

    let genreStr;
    if (genre.length === 1) {
      genreStr = `${genre[0]}`;
    } else if (genre.length === 2) {
      genreStr = `${genre[0]}, ${genre[1]}`;
    } else if (genre.length > 2) {
      genreStr = `${genre[0]}, ${genre[1]}, Other`;
    }
    return `<div class="card-container" data-id="${el.id}">
                  <img src="${poster}" alt="${
      el.original_title || el.original_name
    }" class="film-img" />
                  <h2 class="film-title">${el.title || el.name}</h2>
                  <div class="info-container">
                      <span class="film-genres">${genreStr} |</span>
                      <span class="film-relise">${reliseDate}</span>
                  </div>
              </div>`;
  });

  //pagination change _cardStyle.scss v1 to .cards-container; v2 to .card-container;
  // pagination(markup); //v1
  pagination2(markup);   //v2
  return '';
}
