import { Clear } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
	AppBar,
	IconButton,
	InputAdornment,
	TextField,
	Toolbar,
	Typography,
	useMediaQuery,
	useScrollTrigger,
	useTheme,
} from "@mui/material";
import { cloneElement } from "react";

function ElevationScroll(props) {
	const { children, target } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: target ? target : window,
	});

	return cloneElement(children, {
		elevation: trigger ? 4 : 0,
		sx: {
			backgroundColor: trigger ? "rgba(0,0,0,0.5)" : "transparent",
		},
	});
}

export default function NavBar({
	scrollTarget,
	hasSearchBar,
	query,
	setQuery,
}) {
	const theme = useTheme();
	const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<ElevationScroll target={scrollTarget}>
			<AppBar
				position="sticky"
				color="transparent"
				sx={{
					width: "100%",
				}}
			>
				<Toolbar
					disableGutters
					sx={{
						paddingX: "2rem",
						justifyContent: "space-between",
					}}
				>
					<Typography
						variant="h5"
						fontWeight={700}
						sx={{
							display: {
								xs: hasSearchBar ? "none" : "initial",
								sm: "initial",
							},
							textShadow: "2px 2px 2px rgba(0,0,0,.5)",
							"&:hover": {
								textShadow: "none",
								textShadow:
									"0 0 10px rgba(255,255,255,.25), 0 0 10px rgba(255,255,255,.25), 0 0 10px rgba(255,255,255,.25), 0 0 10px rgba(255,255,255,.25), 0 0 10px rgba(255,255,255,.25), 0 0 10px rgba(255,255,255,.25), 0 0 10px rgba(255,255,255,.25)",
								cursor: "pointer",
							},
						}}
					>
						Peliculas.uy
					</Typography>
					{hasSearchBar && (
						<TextField
							variant="outlined"
							placeholder="Buscar..."
							size="small"
							type="search"
							value={query}
							fullWidth={isSmDown}
							onChange={(e) => setQuery(e.target.value)}
							InputProps={{
								sx: {
									borderRadius: "50px",
									backgroundColor: "white",
									color: "black",
								},
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
								endAdornment: query && (
									<IconButton onClick={() => setQuery("")}>
										{query.length > 0 ? <Clear /> : null}
									</IconButton>
								),
							}}
						></TextField>
					)}
				</Toolbar>
			</AppBar>
		</ElevationScroll>
	);
}
