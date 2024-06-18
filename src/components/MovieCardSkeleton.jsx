import { Box, Card, CardActionArea, Skeleton, Typography } from "@mui/material";

export default function MovieCardSkeleton({ poster_size }) {
	return (
		<Card
			sx={{
				marginY: "10px",
				width: `${poster_size ? poster_size : "185"}px`,
				backgroundColor: "transparent",
				textAlign: "center",
				margin: "auto",
			}}
		>
			<Skeleton
				variant="rounded"
				width={`${poster_size ? poster_size : "185"}px`}
				height={`${poster_size ? poster_size * (278 / 185) : "278"}px`}
				sx={{
					bgcolor: "grey.900",
				}}
			/>
		</Card>
	);
}
