import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export default function onModalOpen(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  basicLightbox
    .create(
      `<img class="modal__img" src="${e.target.dataset.source}" alt="${e.target.alt}"/>`,
    )
    .show();
}
