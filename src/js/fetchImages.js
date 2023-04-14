import axios from 'axios';

const PER_PAGE = 40;
const API_URL = `https://pixabay.com/api/?key=35398655-7fbcf1a59847d6fb5630959e5&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}`;

export const fetchImages = async (queries, page) => {
  try {
    const res = await axios.get(`${API_URL}&q=${queries}&page=${page}`);

    if (res.status === 404)
      throw new Error('Something went wrong. Please check your internet connection and try again.');
    if (res.data.hits.length === 0)
      throw new Error('Sorry, there are no images matching your search query. Please try again.');
    if (page * PER_PAGE > res.data.totalHits)
      throw new Error("We're sorry but you've reached the end of search results");

    return res.data;
  } catch (err) {
    throw err;
  }
};
