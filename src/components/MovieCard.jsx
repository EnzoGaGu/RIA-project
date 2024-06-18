import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import Movie from "../types/Movie";

export default function MovieCard({
	movie,
	poster_size,
	onMouseEnterHandler,
	onMouseLeaveHandler,
}) {
	if (movie instanceof Movie) {
		return (
			<Card
				sx={{
					marginY: "10px",
					width: `${poster_size ? poster_size : "185"}px`,
					backgroundColor: "transparent",
					textAlign: "center",
					margin: "auto",
				}}
				onMouseEnter={onMouseEnterHandler}
				onMouseLeave={onMouseLeaveHandler}
			>
				<CardActionArea
					sx={{
						opacity: "0.8",
						transition: "opacity .5s ease-out",
						"&:hover": {
							opacity: "1.0",
						},
					}}
				>
					<CardMedia
						image={
							"https://image.tmdb.org/t/p/w" +
							(poster_size ? poster_size : "185") +
							movie.poster_path
						}
						sx={{
							height: `${
								poster_size ? poster_size * (278 / 185) : "278"
							}px`,
						}}
					>
						<Box
							sx={{
								width: "100%",
								height: "100%",
								backgroundImage:
									"linear-gradient(0deg, rgba(0,0,0,1) 10%, rgba(255,255,255,0) 100%)",
							}}
						></Box>
						<CardContent
							sx={{
								padding: "16px",
								position: "absolute",
								bottom: "0",
								width: "calc(100% - 32px)",
								height: "calc(100% - 32px)",
								"&:last-child": {
									height: "calc(100% - 38px)",
								},
								color: "white",
								"&:hover": {
									"& .ellipsis": {
										overflow: "unset",
										textOverflow: "unset",
										whiteSpace: "unset",
									},
								},
							}}
						>
							<Typography
								variant="h5"
								className="ellipsis"
								sx={{
									position: "absolute",
									bottom: "44px",
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
									fontWeight: "700",
									width: "inherit",
								}}
							>
								{movie.title}
							</Typography>
							<Typography
								variant="subtitle1"
								sx={{
									position: "absolute",
									bottom: "16px",
									width: "inherit",
								}}
							>
								{movie.release_date.substring(0, 4)}
							</Typography>
						</CardContent>
					</CardMedia>
				</CardActionArea>
			</Card>
		);
	} else {
		throw new TypeError("La película no tiene el tipo correcto.");
	}
}
