// (() => {
//   const refs = {
//     openModalBtn: document.querySelector('[futer-modal-open]'),
//     closeModalBtn: document.querySelector('[futer-modal-close]'),
//     modal: document.querySelector('[futer-modal]'),
//   };

//   refs.openModalBtn.addEventListener('click', toggleModal);
//   refs.closeModalBtn.addEventListener('click', toggleModal);

//   function toggleModal() {
//     refs.modal.classList.toggle('is-hidden');
//   }
// })();

(() => {
  const refs = {
    openMenuBtn: document.querySelector('[futer-modal-open]'),
    closeMenuBtn: document.querySelector('[futer-modal-close]'),
    menu: document.querySelector('[futer-modal]'),
  };
  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.closeMenuBtn.addEventListener('click', toggleMenu);
  function toggleMenu() {
    refs.menu.classList.toggle('is-hidden');
    document.body.classList.toggle('no-scroll');
  }
})();
