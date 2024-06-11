export default class SpokenLanguage {
	// Clase devuelta por servicio para obtener detalles de la película dentro de "spoken_languages".

	constructor(spoken_language) {
		this.english_name = spoken_language.english_name; // string
		this.iso_639_1 = spoken_language.iso_639_1; // string
		this.name = spoken_language.name; // string
	}
}
