const refs = {
  openMenuBtn: document.querySelector('[futer-modal-open]'),
  closeMenuBtn: document.querySelector('[futer-modal-close]'),
  menu: document.querySelector('[futer-modal]'),
};
refs.openMenuBtn.addEventListener('click', toggleMenu);
refs.closeMenuBtn.addEventListener('click', toggleMenu);
export default function toggleMenu() {
  refs.menu.classList.toggle('is-hidden');
  document.body.classList.toggle('no-scroll');
}
