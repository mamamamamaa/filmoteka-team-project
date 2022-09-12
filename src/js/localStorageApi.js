// let allMovie = {};

//   const btnWatched = document.querySelector(".js-btnWatched");
//   const btnQueue = document.querySelector(".js-btnQueue");

//   const watchedList = JSON.parse(localStorage.getItem("watched")) || [];
//   const queueList = JSON.parse(localStorage.getItem("queue")) || [];

//   btnWatched.addEventListener("click", addWatchedList);
//   btnQueue.addEventListener("click", addQueueList);

//   function addWatchedList() {
//     const watchedList = JSON.parse(localStorage.getItem("watched")) || [];
//     checkList(watchedList, allMovie.movie, "watched");
//     // console.log('watchedList', watchedList);
//   }

//   function addQueueList() {
//     const queueList = JSON.parse(localStorage.getItem("queue")) || [];
//     checkList(queueList, allMovie.movie, "queue");
//     console.log('queueList', queueList);
//     // console.log('allMovie', allMovie.movie);
//   }

//   function checkList(list, movie, state) {
//       localStorage.setItem(state, JSON.stringify(list));
//       list.push(movie);
//       localStorage.setItem(state, JSON.stringify(list));

//   }
