import { redirect, useNavigate, useRouteError } from "react-router-dom";
import PageTemplate from "../components/PageTemplate";
import ErrorStatus from "../errors/ErrorStatus";
import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function ErrorChildren({ error }) {
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
			<Typography variant="h2">
				Error
				{error instanceof ErrorStatus &&
					error.status &&
					" " + error.status}
			</Typography>
			<Typography variant="h6">
				{error.message || "Hubo un error procesando su solicitud."}
			</Typography>
		</Box>
	);
}

export default function Error() {
	const error = useRouteError();

	return (
		<PageTemplate>
			<ErrorChildren error={error} />
		</PageTemplate>
	);
}
