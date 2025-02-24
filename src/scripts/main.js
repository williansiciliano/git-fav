import { FavoritesView } from './Favorites.js';
import { changeImgBtnFav, resetImgBtnFav } from './Events.js';

new FavoritesView("#app")// Instancia a classe que gerencia os favoritos

/* Evento para mudar a imagem do botão no hover */
document.addEventListener('DOMContentLoaded', () => {
	const btnFav = document.getElementById('btn-fav');

	btnFav.addEventListener('mouseover', changeImgBtnFav);
	btnFav.addEventListener('mouseout', resetImgBtnFav)
})


