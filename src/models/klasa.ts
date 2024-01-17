import Nauczyciel from "./nauczyciel";

class Klasa {
	private id: number;
	private rok: number; //(obowiązkowe, od 1 do 8)
	private grupa: string; //(obowiązkowe, od A do Z)
	private liczba_uczniow: number; //(obowiązkowe, od 10 do max 32)
	private idWychowawcy: number; //(obowiązkowe)
	private profil: string; //(max 20 małych/dużych liter)

	public constructor(
		id: number,
		rok: number,
		grupa: string,
		liczba_uczniow: number,
		idWychowawcy: number,
		profil: string
	) {
		this.id = id;
		this.rok = rok;
		this.grupa = grupa;
		this.liczba_uczniow = liczba_uczniow;
		this.idWychowawcy = idWychowawcy;
		this.profil = profil;
	}

	public static copyFactory(klasa: Klasa) {
		let newKlasa = new Klasa(
			klasa.id,
			klasa.rok,
			klasa.grupa,
			klasa.liczba_uczniow,
			klasa.idWychowawcy,
			klasa.profil
		);
		return newKlasa;
	}

	public get JSONized(): any {
		return {
			id: String(this.id),
			rok: String(this.rok),
			grupa: this.grupa,
			liczba_uczniow: String(this.liczba_uczniow),
			idWychowawcy: String(this.idWychowawcy),
			profil: this.profil,
		};
	}

	public get Rok(): number {
		return this.rok;
	}

	public get Grupa(): string {
		return this.grupa;
	}

	public get Liczba_uczniow(): number {
		return this.liczba_uczniow;
	}

	public get Profil(): string {
		return this.profil;
	}

	public get Id(): number {
		return this.id;
	}

	public get Rg(): string {
		return `${this.rok}${this.grupa}` ?? `??`;
	}

	public get WychowawcaId(): number {
		return this.WychowawcaId;
	}
}

export default Klasa;
