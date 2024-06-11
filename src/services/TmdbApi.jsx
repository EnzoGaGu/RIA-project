import MovieList from "../types/MovieList";
import Filter from "./Filter";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "a5ccf2019c0fd5338578c73a931b2a8b";
const API_ACCESS_TOKEN =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWNjZjIwMTljMGZkNTMzODU3OGM3M2E5MzFiMmE4YiIsInN1YiI6IjY2NjY0MWJmMDMwNjM1Y2RhZTE1OTMyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.49v4TNIFXcerkONApoib-ibeiHTXVGJOc5j9NFiaU14";

async function fethAPI(endpoint, queryParams) {
	var url = `${API_BASE_URL}${endpoint}?language=es-UY`;
	if (
		Array.isArray(queryParams) &&
		queryParams.length > 0 &&
		queryParams.every((x) => x && x instanceof Filter)
	) {
		queryParams.forEach((filter) => {
			url += `&${filter.name}=${filter.value}`;
		});
	} else {
		if (!(queryParams == null)) {
			console.error(`${endpoint}: Query params con tipo no válido.`);
			throw new TypeError(
				"Los query params llevan un tipo de dato no reconocido."
			);
		}
	}

	const options = {
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + API_ACCESS_TOKEN,
		},
	};

	return fetch(url, options).then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			console.error(`${endpoint}: Error en fetch.`);
			throw new Error("Hubo un error intentando obtener los datos.");
		}
	});
}

export async function discoverMovies(page) {
	if (page == null || (typeof page === "number" && Number.isInteger(page))) {
		var filters = [];
		if (Number(page) > 0) {
			filters.push(new Filter("page", page));
		} else {
			filters.push(new Filter("page", 1));
		}

		return fethAPI("/discover/movie", filters)
			.then((json) => {
				return new MovieList(json);
			})
			.catch((error) => {
				console.error(`/discover/movie: ${error}`);
				throw new Error(error);
			});
	} else {
		throw new TypeError("La página debe ser un entero.");
	}
}

export async function searchMovies(page, query) {
	if (page == null || (typeof page === "number" && Number.isInteger(page))) {
		var filters = [];
		if (Number(page) > 0) {
			filters.push(new Filter("page", page));
		} else {
			filters.push(new Filter("page", 1));
		}
		filters.push(new Filter("query", query));

		return fethAPI("/search/movie", filters)
			.then((json) => {
				return new MovieList(json);
			})
			.catch((error) => {
				console.error(`/search/movie: ${error}`);
				throw new Error(error);
			});
	} else {
		throw new TypeError("La página debe ser un entero.");
	}
}

export async function movieDetails(movie_id) {
	if (typeof movie_id === "number" && Number.isInteger(movie_id)) {
		return fethAPI(`/movie/${movie_id}`, [])
			.then((json) => {
				return new movieDetails(json);
			})
			.catch((error) => {
				console.error(`/movie/${movie_id}: ${error}`);
				throw new Error(error);
			});
	} else {
		throw new TypeError("La ID de la película debe ser un entero.");
	}
}
