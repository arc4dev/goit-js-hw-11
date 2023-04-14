import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'flowbite/dist/flowbite.min.css';
import { Notify } from 'notiflix';
import { fetchImages } from './fetchImages';
import { createCards } from './createCards';

const form = document.getElementById('search-form');
const container = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

let page, currentQuery, isSearched;

const init = () => {
  page = 1;
  currentQuery = null;
  isSearched = false;
  container.innerHTML = '';
  loadMoreBtn.style.display = 'none';
};

init();

const renderUI = async (query, page) => {
  try {
    const data = await fetchImages(query, page);
    console.log(data);

    const cards = createCards(data.hits);

    container.insertAdjacentHTML('beforeend', cards);

    loadMoreBtn.style.display = 'block';

    if (!isSearched) Notify.info(`Hooray! We found ${data.totalHits} images.`);

    lightbox.refresh();

    isSearched = true;
  } catch (err) {
    Notify.failure(err.message);
    console.log(err);
  }
};

//events

form.addEventListener('submit', e => {
  e.preventDefault();

  const value = e.target[0].value.trim();
  if (value === '') return;

  init();

  currentQuery = value;
  renderUI(value, page);
});

loadMoreBtn.addEventListener('click', () => {
  page++;
  renderUI(currentQuery, page);
});

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
