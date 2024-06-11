export default class Genre {
	// Clase devuelta por servicio para obtener detalles de la película dentro de "genres".

	constructor(genre) {
		this.id = genre.id; // number (entero)
		this.name = genre.name; // string
	}
}
