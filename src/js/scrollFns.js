let currentPosition = '';
const modal = document.querySelector('[data-modal]');

export function disableScroll() {
  currentPosition = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = '-${currentPosition}px';
  document.body.style.width = '100%';

  modal.classList.toggle('is-hidden');
}

export function scroll() {
  modal.classList.toggle('is-hidden');
  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo({
    top: currentPosition,
    behavior: 'instant',
  });
}
