import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import MovieList from "../types/MovieList";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import Movie from "../types/Movie";
import { useEffect, useRef } from "react";

export default function MovieGrid({
	movies,
	loading,
	hasMore,
	setBackground,
	onReachBottom,
}) {
	const theme = useTheme();
	const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
	const observerTarget = useRef(null);

	useEffect(() => {
		if (onReachBottom) {
			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						onReachBottom();
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
		}
	}, [observerTarget, onReachBottom]);

	return (
		<>
			<Grid
				container
				spacing={2}
				justifyContent={"space-between"}
				alignItems={"center"}
			>
				{movies instanceof MovieList &&
				Array.isArray(movies.results) &&
				movies.results.length > 0 &&
				movies.results.every((x) => x instanceof Movie)
					? movies.results.map((movie) => {
							return (
								<Grid item xs={12} sm={6} md={3} key={movie.id}>
									<MovieCard
										movie={movie}
										poster_size={isLgUp ? 300 : 185}
										onMouseEnterHandler={() =>
											setBackground(movie.backdrop_path)
										}
										onMouseLeaveHandler={() =>
											setBackground(
												movies.results[0].backdrop_path
											)
										}
									/>
								</Grid>
							);
					  })
					: null}
				{loading
					? Array.from(new Array(4)).map((_, index) => {
							return (
								<Grid item xs={12} sm={6} md={3} key={index}>
									<MovieCardSkeleton
										poster_size={isLgUp ? 300 : 185}
									/>
								</Grid>
							);
					  })
					: null}
			</Grid>
			{movies && !hasMore && (
				<Typography
					variant="subtitle2"
					textAlign="center"
					marginTop={10}
				>
					LLEGASTE AL FINAL DE LA LISTA
				</Typography>
			)}
			<div ref={observerTarget} />
		</>
	);
}
