import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { discoverMovies, searchMovies } from "./services/TmdbApi";
import MovieList from "./types/MovieList";
import Movie from "./types/Movie";
import { Box } from "@mui/material";
import useDebounce from "./utils/Debouncer";
import NavBar from "./components/NavBar";
import MovieGrid from "./components/MovieGrid";

function App() {
	const [movies, setMovies] = useState(null);
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [background, setBackground] = useState();
	const [scrollTarget, setScrollTarget] = useState(null);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(false);
	const scrollContainerRef = useRef(null);
	const secondBoxRef = useRef(null);
	const observerTarget = useRef(null);

	function loadMovies(newPage, newQuery) {
		setLoading(true);

		if (newQuery !== query || newPage > 1) {
			executeLoadMovies(newPage, newQuery);
		} else {
			executeLoadMovies(newPage, newQuery);
		}
	}

	const debouncedQuery = useDebounce(query, 500);

	function executeLoadMovies(newPage, newQuery) {
		const service =
			newQuery.length > 0
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

	function handleScroll() {
		if (!loading && hasMore) {
			const nextPage = page + 1;
			setPage(nextPage);
			loadMovies(nextPage, query);
		}
	}

	useEffect(() => {
		if (scrollContainerRef.current) {
			setScrollTarget(scrollContainerRef.current);
		}
	}, [scrollContainerRef]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					handleScroll();
				}
			},
			{ threshold: 1 }
		);

		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}

		return () => {
			if (observerTarget.current) {
				observer.unobserve(observerTarget.current);
			}
		};
	}, [observerTarget, handleScroll]);

	useEffect(() => {
		setPage(1);
		loadMovies(1, debouncedQuery);
	}, [debouncedQuery]);

	useEffect(() => {
		if (
			page === 1 &&
			secondBoxRef.current &&
			secondBoxRef.current.scrollTop > 0
		) {
			secondBoxRef.current.scrollTop = 0;
		}
	}, [page]);

	return (
		<Box
			id="mainBox"
			height="100vh"
			width="100vw"
			sx={{
				padding: "0",
				backgroundColor: "rgba(0,0,0,1)",
				overflow: "auto",
			}}
			ref={scrollContainerRef}
		>
			<Box
				sx={{
					background: background
						? `linear-gradient(0deg, rgba(0,0,0,1) 20%, rgba(255,255,255,0) 100%),
							url("https://image.tmdb.org/t/p/original${background}")`
						: "inherit",
					backgroundSize:
						window.innerHeight > window.innerWidth
							? "calc((100vh * 16) / 9) 100vh"
							: "100vw calc((100vw / 16) * 9)",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "top center",
					minHeight: "100vh",
					width: "100%",
				}}
				ref={secondBoxRef}
			>
				{scrollTarget && (
					<NavBar
						scrollTarget={scrollTarget}
						hasSearchBar
						query={query}
						setQuery={setQuery}
					/>
				)}
				<Box padding={"2rem"}>
					<MovieGrid
						movies={movies}
						loading={loading}
						hasMore={hasMore}
						observerTarget={observerTarget}
						setBackground={setBackground}
					/>
				</Box>
			</Box>
		</Box>
	);
}

export default App;
