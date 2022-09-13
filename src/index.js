import { trendFilms, filmGenre, searchFilms } from './js/fetchData';
import card from './js/card-template';
import toggleModal from './js/modal-film-open-close';
import { btnUpToTop, topFunction } from './js/btnUp';

import localStorageApi from './js/localStorageApi';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const refs = {
  cardBox: document.querySelector('.cards-container'),
};
const container = document.querySelector('#tui-pagination-container');
const options = {
  totalItems: 0,
  itemsPerPage: 15,
  visiblePages: 5,
  page: 1,
};
const pagination = new Pagination(container, options);
const page = pagination.getCurrentPage();

filmGenre(page)
  .then(a => {
    trendFilms().then(e => {
      if (e.data.results.length === 0) {
        console.log('Something wrong');
        return;
      }
      refs.cardBox.innerHTML = card(e.data.results, a);
      pagination.reset(e.data.total_results);
    });
  })
  .catch(error => console.log(error.message));

pagination.on('afterMove', updatePagination);

function updatePagination(event) {
  const currentPage = event.page;
  // console.log(currentPage, event);

  filmGenre(currentPage)
    .then(a => {
      trendFilms(currentPage).then(e => {
        if (e.data.results.length === 0) {
          console.log('Something wrong');
          return;
        }
        // console.log(e.data.page, e.data.results);

        refs.cardBox.innerHTML = card(e.data.results, a);
      });
    })
    .catch(error => console.log(error.message));
}

// filmGenre().then(a => {
//   searchFilms('Fury', 1).then(e => {
//     refs.cardBox.innerHTML += card(e.data.results, a);
//   })
// btnUpToTop();
// topFunction();

// });
