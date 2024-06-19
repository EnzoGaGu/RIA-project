import ErrorStatus from "../../errors/ErrorStatus";
import { movieDetails } from "../../services/TmdbApi";

export default function MovieLoader({ params }) {
	if (params?.id) {
		return movieDetails(Number.parseInt(params.id));
	} else {
		throw new ErrorStatus("No se recibió ID de la película", 400);
	}
}
