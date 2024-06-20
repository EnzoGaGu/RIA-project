import MovieList from "../types/MovieList";
import MovieDetails from "../types/MovieDetails";
import Filter from "./Filter";
import ErrorStatus from "../errors/ErrorStatus";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "a5ccf2019c0fd5338578c73a931b2a8b";
const API_ACCESS_TOKEN =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWNjZjIwMTljMGZkNTMzODU3OGM3M2E5MzFiMmE4YiIsInN1YiI6IjY2NjY0MWJmMDMwNjM1Y2RhZTE1OTMyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.49v4TNIFXcerkONApoib-ibeiHTXVGJOc5j9NFiaU14";

async function fetchAPI(endpoint, queryParams) {
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
		if (
			!(
				queryParams == null ||
				(Array.isArray(queryParams) && queryParams.length === 0)
			)
		) {
			console.error(`${endpoint}: Query params con tipo no válido.`);
			throw new ErrorStatus(
				"Los query params llevan un tipo de dato no reconocido",
				500
			);
		}
	}

	const options = {
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + API_ACCESS_TOKEN,
		},
	};

	return fetch(url, options)
		.then(async (response) => {
			if (200 <= response.status && response.status < 400) {
				return response.json();
			} else {
				if (response.status == 404) {
					throw new ErrorStatus("No se encontró el recurso.", 404);
				} else {
					const json = await response.json();
					throw new ErrorStatus(json.status_message, response.status);
				}
			}
		})
		.catch(async (error) => {
			throw error;
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

		return fetchAPI("/discover/movie", filters)
			.then((json) => {
				return new MovieList(json);
			})
			.catch(async (error) => {
				console.error(
					`/discover/movie (${error.status}): ${error.message}`
				);
				throw error;
			});
	} else {
		throw new ErrorStatus("La página debe ser un entero", 400);
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

		return fetchAPI("/search/movie", filters)
			.then((json) => {
				return new MovieList(json);
			})
			.catch(async (error) => {
				console.error(
					`/search/movie (${error.status}): ${error.message}`
				);
				throw error;
			});
	} else {
		throw new ErrorStatus("La página debe ser un entero", 400);
	}
}

export async function movieDetails(movie_id) {
	if (typeof movie_id === "number" && Number.isInteger(movie_id)) {
		return fetchAPI(`/movie/${movie_id}`, [])
			.then((json) => {
				return new MovieDetails(json);
			})
			.catch((error) => {
				console.error(
					`/movie/${movie_id} (${error.status}): ${error.message}`
				);
				throw error;
			});
	} else {
		throw new ErrorStatus("La ID de la película debe ser un entero", 400);
	}
}

export async function countries() {
	return fetchAPI("/configuration/countries", [])
		.then((json) => {
			const countries = new Map();
			json.forEach((country) => {
				countries.set(country.iso_3166_1, country.native_name);
			});
			return countries;
		})
		.catch((error) => {
			console.error(
				`/configuration/countries (${error.status}): ${error.message}`
			);
			throw error;
		});
}
