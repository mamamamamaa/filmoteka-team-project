import { Loading } from 'notiflix';
import OnlyScroll from 'only-scrollbar';

// const scroll = new OnlyScroll(window, {
//   damping: 0.4,
// });

export const loaderOn = () => {
  Loading.circle('Loading...', {
    backgroundColor: 'rgba(0,0,0,0.5)',
    svgColor: '#c7061a',
  });
};

export const loaderOff = () => {
  Loading.remove(500);
};
