export function pagination(markup) {
  const pagList = document.querySelectorAll('.pagination');
  const showList = document.querySelectorAll('.list');

  function paginationBtn(arr, size = 6) {
    let btn = '';

    pagList.forEach((elem, i) => {
      for (let i = 0; i < arr.length / size; i++) {
        btn += `<button class='pagination__btn'>${i + 1}</button>`;
      }
      elem.innerHTML = btn;
    });
  }
  paginationBtn(markup);
  const btnPag = document.querySelectorAll('.pagination__btn');

  function smartList(page, size = 6) {
    let arrayList = [];
    arrayList = markup.slice().splice(page * size, size);
    showList.forEach((elem, i) => {
      let item = '';
      for (let i = 0; i < arrayList.length; i++) {
        // item += `<div'>${arrayList[i]}</div>`;
        item += `<div class='cards-container'>${arrayList[i]}</div>`;
      }
      elem.innerHTML = item;
    });
    btnPag[0].classList.add('pagination__btn-active');
  }

  function addClass(btnElem, prevBtn) {
    prevBtn.forEach(elem => elem.classList.remove('pagination__btn-active'));
    btnElem.classList.add('pagination__btn-active');
  }

  btnPag.forEach((elem, i) => {
    elem.addEventListener('click', () => {
      smartList(i);
      addClass(elem, btnPag);
    });
  });
  smartList(0);
}
