import { Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import MovieDetails from "../types/MovieDetails";
import PageTemplate from "../components/PageTemplate";
import ErrorStatus from "../errors/ErrorStatus";
import { useEffect } from "react";

function MovieChildren({ movie, setBackground }) {
	useEffect(() => {
		setBackground(movie.backdrop_path);
	}, []);

	return (
		<>
			<Typography variant="h3">{movie.title}</Typography>
			<Typography variant="h6">{movie.original_title}</Typography>
			<Typography variant="body1">{movie.overview}</Typography>
		</>
	);
}

export default function Movie() {
	const movie = useLoaderData();

	if (movie instanceof MovieDetails) {
		return (
			<PageTemplate>
				<MovieChildren movie={movie} />
			</PageTemplate>
		);
	} else {
		throw new ErrorStatus(
			"La película devuelta no tiene el formato esperado",
			500
		);
	}
}
