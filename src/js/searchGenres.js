export function searchGenres(genres, el) {
  let genre = [];
  for (const id of el.genre_ids) {
    genres.data.genres.forEach(e => {
      if (e.id === id) {
        genre.push(e.name);
      }
    });
  }
  return genre.length === 1
    ? `${genre[0]}`
    : genre.length === 2
    ? `${genre[0]}, ${genre[1]}`
    : genre.length > 2
    ? `${genre[0]}, ${genre[1]}, Other`
    : '';
}
