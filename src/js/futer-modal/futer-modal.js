(() => {
  const refs = {
    openMenuBtn: document.querySelector('[futer-modal-open]'),
    closeMenuBtn: document.querySelector('[futer-modal-close]'),
    menu: document.querySelector('[futer-modal]'),
  };
  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.closeMenuBtn.addEventListener('click', toggleMenu);
  refs.menu.addEventListener('click', bag);

  let isModal = false;

  function toggleMenu() {
    refs.menu.classList.toggle('is-hidden');
    document.body.classList.toggle('no-scroll');
    isModal = !isModal;
    if (isModal) {
      window.addEventListener('keydown', onEscKeyPress);
    } else {
      window.removeEventListener('keydown', onEscKeyPress);
    }
  }

  function bag(event) {
    if (event.currentTarget === event.target) {
      refs.menu.classList.toggle('is-hidden');
    }
  }

  function onEscKeyPress(event) {
    console.log(event);
    if (event.code === 'Escape') {
      refs.menu.classList.add('is-hidden');
      document.body.classList.remove('no-scroll');
      isModal = false;
      window.removeEventListener('keydown', onEscKeyPress);
    }
  }
})();