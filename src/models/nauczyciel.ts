//GETTERY NAGLE ZACZELY ZWRACAC ZAWSZE UNDEFINED, STAD TE PUBLIC

class Nauczyciel {
	public id: number;
	public imie: string; //(obowiązkowe, max 20 małych/dużych liter)
	public nazwisko: string; //(obowiązkowe, max 20 małych/dużych liter)
	public wyksztalcenie: string; //(obowiązkowe, max 20 małych/dużych liter)
	public email: string; // ValidEmailString; //(obowiązkowe, max 40 znaków)

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
		return this.nazwisko + " " + this.imie;
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
