const refs = {
  openMenuBtn: document.querySelector('[futer-modal-open]'),
  closeMenuBtn: document.querySelector('[futer-modal-close]'),
  menu: document.querySelector('[futer-modal]'),
  modal: document.querySelector('[data-modal]'),
};

refs.openMenuBtn.addEventListener('click', toggleMenu);
refs.closeMenuBtn.addEventListener('click', toggleMenu);
refs.menu.addEventListener('click', onBackDroppClick);

if (refs.modal) {
  refs.modal.addEventListener('click', backDropFilm);
}

document.addEventListener('keydown', onEsc);

let isModal = false;

export default function toggleMenu() {
  stopVideos();
  refs.menu.classList.toggle('is-hidden');
  isModal = !isModal;
  if (isModal) {
    window.addEventListener('keydown', onEscKeyPress);
  } else {
    window.removeEventListener('keydown', onEscKeyPress);
  }
}

function onEscKeyPress(event) {
  console.log(event);
  if (event.code === 'Escape') {
    stopVideos();
    refs.menu.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
    isModal = false;
    window.removeEventListener('keydown', onEscKeyPress);
  }
}

function onBackDroppClick(event) {
  if (event.currentTarget === event.target) {
    stopVideos();
    refs.menu.classList.toggle('is-hidden');
  }
}

let isModalShown = false;

export function toggleModal() {
  refs.modal.classList.toggle('is-hidden');

  isModalShown = !isModalShown;
  if (isModalShown) {
    window.addEventListener('keydown', onEsc);
  } else {
    window.removeEventListener('keydown', onEsc);
  }
}

function backDropFilm(event) {
  if (event.currentTarget === event.target) {
    refs.modal.classList.toggle('is-hidden');
  }
}

function onEsc(event) {
  if (event.keyCode === 27) {
    stopVideos();
    refs.modal?.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
    isModalShown = false;
    window.removeEventListener('keydown', onEsc);
  }
}

// функция остановки видео при закрытии модального окна
const stopVideos = () => {
  document.querySelectorAll('iframe').forEach(v => {
    v.src = v.src;
  });
  document.querySelectorAll('video').forEach(v => {
    v.pause();
  });
};
// =====================================================
