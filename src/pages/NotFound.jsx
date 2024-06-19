import { useNavigate } from "react-router-dom";
import PageTemplate from "../components/PageTemplate";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

function NotFoundChildren() {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate("/");
		}, 5000);
	});
	return (
		<Box
			sx={{
				paddingY: "4rem",
				backgroundColor: "white",
				borderRadius: "10px",
				color: "grey.800",
				textAlign: "center",
			}}
		>
			<Typography variant="h2">Error 404</Typography>
			<Typography variant="h6">Página no encontrada</Typography>
		</Box>
	);
}

export default function NotFound() {
	return (
		<PageTemplate>
			<NotFoundChildren />
		</PageTemplate>
	);
}
