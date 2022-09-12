import axios from 'axios';
import { loaderOn } from './loader';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '22ffd9c27f352ff768d0db984597ea70';

export async function trendFilms(page = 1) {
  const axiosParams = { params: { api_key: API_KEY, page } };
  loaderOn();
  return await axios.get(`${BASE_URL}/trending/all/day`, axiosParams);
}

export async function filmGenre() {
  const axiosParams = { params: { api_key: API_KEY, language: 'en-US' } };
  return await axios.get(`${BASE_URL}/genre/movie/list`, axiosParams);
}

export async function searchFilms(query, page = 1) {
  const axiosParams = {
    params: {
      api_key: API_KEY,
      page,
      query,
      language: 'en-US',
      include_adult: false,
    },
  };
  loaderOn();
  return await axios.get(`${BASE_URL}search/movie`, axiosParams);
}
