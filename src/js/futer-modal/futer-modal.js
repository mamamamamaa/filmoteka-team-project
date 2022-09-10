(() => {
  const refs = {
    openModalBtn: document.querySelector('[futer-modal-open]'),
    closeModalBtn: document.querySelector('[futer-modal-close]'),
    modal: document.querySelector('[futer-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
})();
