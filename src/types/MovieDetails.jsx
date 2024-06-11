import Genre from "./Genre";
import ProductionCompany from "./ProductionCompany";
import ProductionCountry from "./ProductionCountry";
import SpokenLanguage from "./SpokenLanguage";

export default class MovieDetails {
	// Clase devuelta por servicio para obtener detalles de la película.

	constructor(movie_details) {
		this.adult = movie_details.adult; // boolean
		this.backdrop_path = movie_details.backdrop_path; // string
		this.belongs_to_collection = movie_details.belongs_to_collection; // string
		this.budget = movie_details.budget; // number (entero)
		this.genres = []; // arreglo de Genre
		if (movie_details.genres instanceof Array) {
			movie_details.genres.forEach((element) => {
				this.genres.push(new Genre(element));
			});
		}
		this.homepage = movie_details.homepage; // string
		this.id = movie_details.id; // number (entero)
		this.imdb_id = movie_details.imdb_id; // string
		this.original_language = movie_details.original_language; // string
		this.original_title = movie_details.original_title; // string
		this.overview = movie_details.overview; // string
		this.popularity = movie_details.popularity; // number
		this.poster_path = movie_details.poster_path; // string
		this.production_companies = []; // arreglo de ProductionCompany
		if (movie_details.production_companies instanceof Array) {
			movie_details.production_companies.forEach((element) => {
				this.production_companies.push(new ProductionCompany(element));
			});
		}
		this.production_countries = []; // arreglo de ProductionCountry
		if (movie_details.production_countries instanceof Array) {
			movie_details.production_countries.forEach((element) => {
				this.production_countries.push(new ProductionCountry(element));
			});
		}
		this.release_date = movie_details.release_date; // string
		this.revenue = movie_details.revenue; // number (entero)
		this.runtime = movie_details.runtime; // number (entero)
		this.spoken_languages = []; // arreglo de SpokenLanguage
		if (movie_details.spoken_languages instanceof Array) {
			movie_details.spoken_languages.forEach((element) => {
				this.spoken_languages.push(new SpokenLanguage(element));
			});
		}
		this.status = movie_details.status; // string
		this.tagline = movie_details.tagline; // string
		this.title = movie_details.title; // string
		this.video = movie_details.video; // boolean
		this.vote_average = movie_details.vote_average; // number
		this.vote_count = movie_details.vote_count; // number (entero)
	}
}
