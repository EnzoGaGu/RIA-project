import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Movie from "../pages/Movie";
import MovieLoader from "./loaders/MovieLoader";
import NotFound from "../pages/NotFound";
import Error from "../pages/Error";

export const PeliculasRouter = createBrowserRouter([
	{
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "pelicula/:id",
				element: <Movie />,
				loader: MovieLoader,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);
