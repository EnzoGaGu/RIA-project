export default class ProductionCountry {
	// Clase devuelta por servicio para obtener detalles de la película dentro de "production_countries".

	constructor(production_country) {
		this.iso_3166_1 = production_country.iso_3166_1; // string
		this.name = production_country.name; // string
	}
}
