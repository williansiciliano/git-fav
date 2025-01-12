export function changeImgBtnFav(){
	const img = document.getElementById('img-btn-fav');

	img.setAttribute('src', 'assets/images/star-blue-icon.png')
}
	
export function resetImgBtnFav(){
	const img = document.getElementById('img-btn-fav');

	img.setAttribute('src', 'assets/images/star-white-icon.png')
}

