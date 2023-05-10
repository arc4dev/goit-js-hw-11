import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'flowbite/dist/flowbite.min.css';
import { Notify } from 'notiflix';
import { fetchImages } from './fetchImages';
import { createCards } from './createCards';

const form = document.getElementById('search-form');
const container = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');
const footer = document.getElementById('footer');

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

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || !isSearched) return;

      page++;
      renderUI(currentQuery, page);
    });
  },
  {
    root: null,
    rootMargin: '800px',
    threshold: 0,
  }
);

//events

observer.observe(footer);

form.addEventListener('submit', e => {
  e.preventDefault();

  const value = e.target[0].value.trim();
  if (value === '') return;

  init();

  currentQuery = value;
  renderUI(value, page);
});

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
