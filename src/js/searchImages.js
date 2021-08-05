import { alert, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import debounce from 'lodash.debounce';

import ApiService from './components/apiService';
import getRefs from './refs';
import imageCardTpl from '../templates/imageCardTpl.hbs';
import onModalOpen from './components/lightbox';

const refs = getRefs();

const apiService = new ApiService();

refs.searchInput.addEventListener('input', debounce(onSearch, 500));
refs.galleryList.addEventListener('click', onModalOpen);

function onSearch(e) {
  try {
    e.preventDefault();
    clearImageList();

    apiService.query = e.target.value.trim();

    if (!apiService.query) {
      return;
    } else {
      apiService.resetPage();
      fetchImagesList();
    }
  } catch {
    fetchError();
  }
}

const clearImageList = () => {
  refs.galleryList.innerHTML = '';
  observer.disconnect(refs.sentinel);
};

const imageListMarkup = data => {
  try {
    const contriesArr = data.length;
    if (contriesArr === 0) {
      fetchError();
    }
    if (contriesArr > 0 && contriesArr === data.length - 1) {
      alert({
        type: 'notice',
        text: 'Это всё, что есть. Будем очень благодарны, если пополните нашу коллекцию изображений!',
        delay: 3000,
        sticker: false,
        animateSpeed: 'slow',
      });
    }

    const imageMarkup = imageCardTpl(data);
    render(imageMarkup);
  } catch {
    fetchError();
  }
};

const render = data => {
  refs.galleryList.insertAdjacentHTML('beforeend', data);
};

function fetchError() {
  error({
    type: 'notice',
    text: 'Нет изображений по Вашему запросу',
    delay: 3000,
    sticker: false,
    animateSpeed: 'slow',
  });
}

function fetchImagesList() {
  apiService.fetchImages().then(imageListMarkup).catch(fetchError);
  observer.observe(refs.sentinel);
}

const onScroll = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && apiService.query !== '') {
      fetchImagesList();
    }
  });
};

const options = {
  rootMargin: '250px',
};

const observer = new IntersectionObserver(onScroll, options);
