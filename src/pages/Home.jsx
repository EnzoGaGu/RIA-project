import React, { useEffect, useRef, useState } from "react";
import { discoverMovies, searchMovies } from "../services/TmdbApi";
import MovieList from "../types/MovieList";
import Movie from "../types/Movie";
import MovieGrid from "../components/MovieGrid";
import PageTemplate from "../components/PageTemplate";

function HomeChildren({ scrollToTop, setBackground, debouncedQuery, query }) {
	const [movies, setMovies] = useState(null);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(false);

	function loadMovies(newPage, newQuery) {
		setLoading(true);

		if (newQuery !== query || newPage > 1) {
			executeLoadMovies(newPage, newQuery);
		} else {
			executeLoadMovies(newPage, newQuery);
		}
	}

	function executeLoadMovies(newPage, newQuery) {
		const service =
			newQuery?.length > 0
				? searchMovies(newPage, newQuery)
				: discoverMovies(newPage);

		service.then((data) => {
			const newMovies = new MovieList({
				...data,
				results:
					newPage === 1
						? data.results
						: movies.results.concat(data.results),
			});
			setMovies(newMovies);
			setHasMore(data.total_pages > newPage);
			setLoading(false);
			if (
				newPage === 1 &&
				data.results.length > 0 &&
				data.results[0] instanceof Movie
			) {
				setBackground(data.results[0].backdrop_path);
			}
		});
	}

	function handleReachBottom() {
		if (!loading && hasMore) {
			const nextPage = page + 1;
			setPage(nextPage);
			loadMovies(nextPage, query);
		}
	}

	useEffect(() => {
		setPage(1);
		loadMovies(1, debouncedQuery);
	}, [debouncedQuery]);

	useEffect(() => {
		if (page === 1) {
			scrollToTop();
		}
	}, [page]);

	return (
		<MovieGrid
			movies={movies}
			loading={loading}
			hasMore={hasMore}
			setBackground={setBackground}
			onReachBottom={handleReachBottom}
		/>
	);
}

export default function Home() {
	return (
		<PageTemplate navBarHasSearchBar>
			<HomeChildren />
		</PageTemplate>
	);
}
