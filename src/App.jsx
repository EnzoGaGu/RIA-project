import { useEffect, useState } from "react";
import "./App.css";
import { discoverMovies } from "./services/TmdbApi";
import MovieList from "./types/MovieList";
import Movie from "./types/Movie";
import { Box, Grid, useMediaQuery } from "@mui/material";
import MovieCard from "./components/MovieCard";

function App() {
	const [movies, setMovies] = useState(null);
	const [loading, setLoading] = useState(true);
	const [background, setBackground] = useState();
	const isLgUp = useMediaQuery("(min-width: 1200px)");

	useEffect(() => {
		setLoading(true);
		discoverMovies(1).then((data) => {
			setMovies(data);
			if (data?.results?.length > 0 && data.results[0] instanceof Movie) {
				setBackground(data.results[0].backdrop_path);
			}
			setLoading(false);
		});
	}, []);

	return (
		<Box
			sx={{
				padding: "0",
				backgroundColor: "rgba(0,0,0,1)",
				zIndex: "-1",
			}}
		>
			<Box
				sx={{
					background: background
						? `linear-gradient(0deg, rgba(0,0,0,1) 20%, rgba(255,255,255,0) 100%),
							url("https://image.tmdb.org/t/p/original${background}")`
						: "inherit",
					backgroundSize: "100vw calc(((100vw / 16) * 9) + 10px)",
					backgroundRepeat: "no-repeat",
					padding: "2rem",
				}}
			>
				<Grid container spacing={2}>
					{movies instanceof MovieList
						? movies.results.map((movie) => {
								if (movie instanceof Movie) {
									return (
										<Grid
											item
											xs={6}
											md={3}
											key={movie.id}
											onMouseEnter={() =>
												setBackground(
													movie.backdrop_path
												)
											}
											onMouseLeave={() =>
												setBackground(
													movies.results[0]
														.backdrop_path
												)
											}
										>
											<MovieCard
												movie={movie}
												poster_size={isLgUp ? 300 : 185}
											/>
										</Grid>
									);
								}
						  })
						: null}
				</Grid>
			</Box>
		</Box>
	);
}

export default App;
