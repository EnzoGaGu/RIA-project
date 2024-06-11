import Movie from "./Movie";

export default class MovieList {
	// Clase devuelta por servicios de búsqueda o Discover.

	constructor(movie_list) {
		this.page = movie_list.page; // number (entero)
		this.results = []; // arreglo de Movie
		if (movie_list?.results instanceof Array) {
			movie_list.results.forEach((element) => {
				this.results.push(new Movie(element));
			});
		}
		this.total_pages = movie_list.total_pages; // number (entero)
		this.total_results = movie_list.total_results; // number (entero)
	}
}
