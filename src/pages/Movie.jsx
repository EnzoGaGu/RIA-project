import {
	Box,
	Card,
	CardActionArea,
	CardMedia,
	Modal,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import MovieDetails from "../types/MovieDetails";
import PageTemplate from "../components/PageTemplate";
import ErrorStatus from "../errors/ErrorStatus";
import { useEffect, useState } from "react";
import ProductionCountry from "../types/ProductionCountry";
import Genre from "../types/Genre";
import { countries } from "../services/TmdbApi";

function Detail({ name, value }) {
	return (
		<Box display="flex" flexDirection="row" flexWrap="wrap">
			<Typography
				variant="subtitle1"
				sx={{
					fontWeight: "700",
				}}
			>
				{name}
			</Typography>
			<Typography variant="subtitle1">{value}</Typography>
		</Box>
	);
}

function MovieChildren({ movie, setBackground }) {
	const [openModal, setOpenModal] = useState(false);
	const [paises, setPaises] = useState("");
	const is2_3Up = useMediaQuery("(min-aspect-ratio: 2/3)");

	if (movie instanceof MovieDetails) {
		const estreno = new Date(movie.release_date) || null;
		const horas = Number.parseInt(movie.runtime / 60) || null;
		const minutos = movie.runtime - 60 * horas || null;
		const duracion =
			(horas > 0 ? horas + ":" : null) + minutos + " hs" || null;
		const idioma = movie.original_language?.toUpperCase() || null;
		var generos = "";

		useEffect(() => {
			if (movie.production_countries.length > 0) {
				countries().then((countries) => {
					var paisesTemp = "";
					movie.production_countries.forEach((productionCountry) => {
						if (productionCountry instanceof ProductionCountry) {
							paisesTemp +=
								", " +
								countries.get(productionCountry.iso_3166_1);
						}
					});
					if (paisesTemp.length > 0) {
						paisesTemp = paisesTemp.substring(2);
					}
					setPaises(paisesTemp);
				});
			}
		}, []);

		if (movie.genres.length > 0) {
			movie.genres.forEach((genre) => {
				if (genre instanceof Genre) {
					generos += ", " + genre.name;
				}
			});
		}

		if (generos.length > 0) {
			generos = generos.substring(2);
		}

		useEffect(() => {
			setBackground(movie.backdrop_path);
		}, []);

		function handlePosterClick() {
			setOpenModal(true);
		}

		function handlePosterClose() {
			setOpenModal(false);
		}

		return (
			<>
				<Box
					display="flex"
					flexDirection="row"
					sx={{
						flexWrap: {
							xs: "wrap",
							md: "nowrap",
						},
						justifyContent: {
							xs: "center",
							md: "start",
						},
						marginBottom: "2rem",
					}}
				>
					<Box
						sx={{
							flexShrink: "0",
							flexGrow: "0",
						}}
					>
						<Card
							sx={{
								width: "185px",
								backgroundColor: "transparent",
								border: "5px solid white",
							}}
						>
							<CardActionArea
								sx={{
									"&:hover": {
										backgroundColor: "black",
									},
								}}
								onClick={handlePosterClick}
							>
								<CardMedia
									image={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
									sx={{
										height: "278px",
										"&:hover": {
											opacity: ".9",
										},
									}}
								/>
							</CardActionArea>
						</Card>
						<Modal
							open={openModal}
							onClose={handlePosterClose}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Card
								sx={{
									width: is2_3Up
										? "calc(((100vh - 5px - 2rem) * 2) / 3)"
										: "calc(100vw - 5px - 2rem)",
									backgroundColor: "transparent",
									border: "5px solid white",
								}}
							>
								<CardMedia
									image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
									sx={{
										height: is2_3Up
											? "calc(100vh - 5px - 2rem)"
											: "calc(((100vw - 5px - 2rem) * 3) / 2)",
									}}
								/>
							</Card>
						</Modal>
					</Box>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						marginLeft="2rem"
						sx={{
							marginTop: {
								xs: "2rem",
								md: "0",
							},
						}}
					>
						<Typography
							variant="h2"
							sx={{
								fontWeight: "700",
							}}
						>
							{movie.title}
						</Typography>
						<Typography variant="h6">
							{movie.original_title}
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						backgroundColor: "white",
						color: "grey.800",
						borderRadius: "10px",
						padding: "2rem",
					}}
				>
					{movie.overview && (
						<Box>
							<Typography
								variant="h5"
								sx={{
									fontWeight: "500",
									marginBottom: "5px",
								}}
							>
								Sinopsis
							</Typography>
							<Typography variant="body1">
								{movie.overview}
							</Typography>
						</Box>
					)}
					<Box
						display="flex"
						flexDirection="column"
						sx={{
							marginTop: "1rem",
						}}
					>
						{duracion && (
							<Detail name="Duración:&nbsp;" value={duracion} />
						)}
						{estreno && (
							<Detail
								name="Fecha de estreno:&nbsp;"
								value={estreno.toLocaleDateString("es-UY")}
							/>
						)}
						{paises.length > 0 && (
							<Detail
								name={
									"País" +
									(movie.production_countries.length > 1
										? "es"
										: "") +
									":\u00A0"
								}
								value={paises}
							/>
						)}
						{idioma && (
							<Detail
								name="Idioma original:&nbsp;"
								value={idioma}
							/>
						)}
						{generos.length > 0 && (
							<Detail
								name={
									"Género" +
									(movie.genres.length > 1 ? "s" : "") +
									":\u00A0"
								}
								value={generos}
							/>
						)}
					</Box>
				</Box>
			</>
		);
	} else {
		throw new ErrorStatus(
			"La película devuelta no tiene el formato esperado",
			500
		);
	}
}

export default function Movie() {
	const movie = useLoaderData();

	return (
		<PageTemplate>
			<MovieChildren movie={movie} />
		</PageTemplate>
	);
}
