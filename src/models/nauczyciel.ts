class Nauczyciel {
	// private static id_indexer: number = 1;
	private id: number;
	private imie: string; //(obowiązkowe, max 20 małych/dużych liter)
	private nazwisko: string; //(obowiązkowe, max 20 małych/dużych liter)
	private wyksztalcenie: string; //(obowiązkowe, max 20 małych/dużych liter)
	private email: string; // ValidEmailString; //(obowiązkowe, max 40 znaków)

	constructor(id: number, imie: string, nazwisko: string, wyksztalcenie: string, email: string) {
		this.imie = imie;
		this.nazwisko = nazwisko;
		this.wyksztalcenie = wyksztalcenie;
		this.email = email;
		this.id = id;
	}

	public static copyFactory(nauczyciel: Nauczyciel) {
		let newNauczyciel = new Nauczyciel(
			nauczyciel.id,
			nauczyciel.imie,
			nauczyciel.nazwisko,
			nauczyciel.wyksztalcenie,
			nauczyciel.email
		);
		return newNauczyciel;
	}

	public get JSONized(): any {
		return {
			id: String(this.id),
			imie: this.imie,
			nazwisko: this.nazwisko,
			wyksztalcenie: this.wyksztalcenie,
			email: this.email,
		};
	}

	public get FullName(): string {
		return this.imie + " " + this.nazwisko;
	}

	public get ShortName(): string {
		return this.imie[0] + ". " + this.nazwisko;
	}

	public get Wyksztalcenie(): string {
		return this.wyksztalcenie;
	}

	public get Email(): string {
		return this.email;
	}

	public get Id(): number {
		return this.id;
	}
}

export default Nauczyciel;
