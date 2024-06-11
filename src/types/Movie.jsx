export default class Movie {
	// Clase devuelta por servicios de búsqueda o Discover dentro de "results".

	constructor(movie) {
		this.adult = movie.adult; // boolean
		this.backdrop_path = movie.backdrop_path; // string
		this.genre_ids = movie.genre_ids; // arreglo de number (enteros)
		this.id = movie.id; // number (entero)
		this.original_language = movie.original_language; // string
		this.original_title = movie.original_title; // string
		this.overview = movie.overview; // string
		this.popularity = movie.popularity; // number
		this.poster_path = movie.poster_path; // string
		this.release_date = movie.release_date; // string
		this.title = movie.title; // string
		this.video = movie.video; // boolean
		this.vote_average = movie.vote_average; // number
		this.vote_count = movie.vote_count; // number (entero)
	}
}
