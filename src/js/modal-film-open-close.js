const refs = {
  cardBox: document.querySelector('.cards-container'),
  modal: document.querySelector('[data-modal]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
};

refs.cardBox.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

export default function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}
