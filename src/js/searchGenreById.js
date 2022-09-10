export default function (e, ids) {
  const genres = e.data.genres;
  let genre = [];
  for (const id of ids) {
    genres.forEach(e => {
      if (e.id === id) {
        genre.push(e.name);
      }
    });
  }
  return genre;
}
