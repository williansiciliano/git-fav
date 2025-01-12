import { FavoritesView } from './Favorites.js';
import { changeImgBtnFav, resetImgBtnFav } from './Events.js';

new FavoritesView("#app")

/* BTN HOVER - Change Star Image*/
document.addEventListener('DOMContentLoaded', () => {
	const btnFav = document.getElementById('btn-fav');

	btnFav.addEventListener('mouseover', changeImgBtnFav);
	btnFav.addEventListener('mouseout', resetImgBtnFav)
})


