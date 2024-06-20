import { Box } from "@mui/material";
import NavBar from "./NavBar";
import { cloneElement, useEffect, useRef, useState } from "react";
import useDebounce from "../utils/Debouncer";

export default function PageTemplate({ children, navBarHasSearchBar }) {
	const [background, setBackground] = useState();
	const [query, setQuery] = useState("");
	const [scrollTarget, setScrollTarget] = useState(null);
	const scrollContainerRef = useRef(null);
	const secondBoxRef = useRef(null);
	const debouncedQuery = useDebounce(query, 500);

	useEffect(() => {
		if (scrollContainerRef.current) {
			setScrollTarget(scrollContainerRef.current);
		}
	}, [scrollContainerRef]);

	function scrollToTop() {
		if (secondBoxRef.current && secondBoxRef.current.scrollTop > 0) {
			secondBoxRef.current.scrollTop = 0;
		}
	}

	return (
		<Box
			id="mainBox"
			height="100vh"
			width="100vw"
			sx={{
				padding: "0",
				backgroundColor: "rgba(0,0,0,1)",
				overflow: "auto",
			}}
			ref={scrollContainerRef}
		>
			<Box
				sx={{
					background: background
						? `linear-gradient(0deg, rgba(0,0,0,1) 20%, rgba(255,255,255,0) 100%),
							url("https://image.tmdb.org/t/p/original${background}")`
						: "inherit",
					backgroundSize:
						window.innerHeight > window.innerWidth
							? "calc((100vh * 16) / 9) 100vh"
							: "100vw calc((100vw / 16) * 9)",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "top center",
					minHeight: "100vh",
					width: "100%",
				}}
				ref={secondBoxRef}
			>
				{scrollTarget && (
					<NavBar
						scrollTarget={scrollTarget}
						hasSearchBar={navBarHasSearchBar}
						query={query}
						setQuery={setQuery}
					/>
				)}
				<Box padding="2rem">
					{cloneElement(children, {
						scrollToTop,
						setBackground,
						debouncedQuery,
						query,
					})}
				</Box>
			</Box>
		</Box>
	);
}
