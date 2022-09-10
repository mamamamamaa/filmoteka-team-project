import { Loading } from "notiflix";

export const loaderOn = () => {
    Loading.circle('Loading...', { backgroundColor: 'rgba(0,0,0,0.5)', svgColor: '#c7061a', });
}

export const loaderOff = () => {
    Loading.remove(500);
}   