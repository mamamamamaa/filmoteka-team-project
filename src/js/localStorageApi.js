  const btnWatched = document.querySelector(".js-btnWatched");
  const btnQueue = document.querySelector(".js-btnQueue");
        
  const watchedList = JSON.parse(localStorage.getItem("watched")) || [];
  const queueList = JSON.parse(localStorage.getItem("queue")) || [];

  btnWatched.addEventListener("click", addWatchedList);
  btnQueue.addEventListener("click", addQueueList);

  function addWatchedList(e) {
    const list = JSON.parse(localStorage.getItem("watched")) || [];
    checkList({ list, state: "watched", id:e.target.value}); 
  }

  function addQueueList(e) {
    console.log('event:', e);
    const list = JSON.parse(localStorage.getItem("queue")) || [];
    checkList({ list, state: "queue", id:e.target.value});
  }

  function checkList({list, state, id}) {
      if  (!list.find((item) => item === id)) {
      const films = [...list];
      films.push(id);
      localStorage.setItem(state, JSON.stringify(films)); 
    } 
  }
        