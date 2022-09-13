const NO_POSTER = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcjBqfRNytcTv3gLsDnnoDKhEyqSS9D-TVsA&usqp=CAU`;

function addWatchedList(data) {
  const list = JSON.parse(localStorage.getItem('watched')) || [];
  checkList(
    {
      list,
      state: 'watched',
      info: {
        poster: data.poster_path || NO_POSTER,
        title: data.title || data.name,
        genres: data.genres.map(e => e.name),
        date: data.release_date || data.first_air_date,
        original_title: data.original_title || data.original_name,
        vote: data.vote_average,
        votes: data.vote_count,
        popularity: data.popularity,
        about: data.overview,
      },
    },
    'queue'
  );
}

function addQueueList(data) {
  console.log(data);
  const list = JSON.parse(localStorage.getItem('queue')) || [];
  checkList(
    {
      list,
      state: 'queue',
      info: {
        poster: data.poster_path || NO_POSTER,
        title: data.title || data.name,
        genres: data.genres.map(e => e.name),
        date: data.release_date || data.first_air_date,
        original_title: data.original_title || data.original_name,
        vote: data.vote_average,
        votes: data.vote_count,
        popularity: data.popularity,
        about: data.overview,
      },
    },
    'watched'
  );
}

function checkList({ list, state, info }, checkState) {
  if (!list.find(item => JSON.stringify(item) === JSON.stringify(info))) {
    const checkStateList = JSON.parse(localStorage.getItem(checkState)) || [];
    const check = checkStateList.find(
      item => JSON.stringify(item) === JSON.stringify(info)
    );
    if (check) {
      const newCheckStateList = checkStateList.filter(
        e => JSON.stringify(e) !== JSON.stringify(info)
      );
      localStorage.setItem(checkState, JSON.stringify(newCheckStateList));
    }
    const films = [...list];
    films.push(info);
    localStorage.setItem(state, JSON.stringify(films));
  }
}

export default function writeLocalStorage(data) {
  const btnWatched = document.querySelector('.js-btnWatched');
  const btnQueue = document.querySelector('.js-btnQueue');
  btnWatched.addEventListener('click', () => {
    addWatchedList(data);
  });
  btnQueue.addEventListener('click', () => {
    addQueueList(data);
  });
}
