export default class ProductionCompany {
	// Clase devuelta por servicio para obtener detalles de la película dentro de "production_companies".

	constructor(production_company) {
		this.id = production_company.id; // number (entero)
		this.logo_path = production_company.logo_path; // string
		this.name = production_company.name; // string
		this.origin_country = production_company.origin_country; // string
	}
}
