import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { discoverMovies } from "./services/TmdbApi";
import MovieList from "./types/MovieList";
import Movie from "./types/Movie";

function App() {
	const [movies, setMovies] = useState(null);

	if (movies == null) {
		discoverMovies(1).then((data) => setMovies(data));
	}

	return (
		<ul>
			{movies instanceof MovieList
				? movies.results.map((movie) => {
						if (movie instanceof Movie) {
							return <li key={movie.id}>{movie.title}</li>;
						}
				  })
				: null}
		</ul>
	);
}

export default App;
