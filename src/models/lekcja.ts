import Klasa from "./klasa";
import Nauczyciel from "./nauczyciel";
import Sala from "./sala";
import DniTygodnia from "./dniTygodnia";
import TypLekcji from "./typyLekcji";

class Lekcja {
	private id: number;
	private nazwa_przedmiotu: string; // (obowiązkowy, max 30 małych/dużych liter)
	private nr_lekcji: number;
	private dzien: DniTygodnia; //; (obowiązkowy, od poniedziałku do piątku)
	private klasa: Klasa; //(obowiązkowy)
	private nauczyciel: Nauczyciel; //(obowiązkowy)
	private sala: Sala; //(obowiązkowy)
	private typ: TypLekcji; //(możliwe 2 do wyboru: konsultacje, zajęcia)

	constructor(
		id: number,
		nazwa_przedmiotu: string,
		nr_lekcji: number,
		dzien: DniTygodnia,
		klasa: Klasa,
		nauczyciel: Nauczyciel,
		sala: Sala,
		typ: TypLekcji
	) {
		this.id = id;
		this.nazwa_przedmiotu = nazwa_przedmiotu;
		this.nr_lekcji = nr_lekcji;
		this.dzien = dzien;
		this.klasa = klasa;
		this.nauczyciel = nauczyciel;
		this.sala = sala;
		this.typ = typ;
	}

	public static copyFactory(lek: Lekcja) {
		let lekcja = new Lekcja(
			lek.id,
			lek.nazwa_przedmiotu,
			lek.nr_lekcji,
			lek.dzien,
			lek.klasa,
			lek.nauczyciel,
			lek.sala,
			lek.typ
		);
		return lekcja;
	}

	public get JSONized(): any {
		return {
			id: String(this.id),
			nazwa_przedmiotu: this.nazwa_przedmiotu,
			nr_lekcji: String(this.nr_lekcji),
			dzien: this.dzien,
			gradeId: String(this.klasa.Id),
			teacherId: String(this.nauczyciel.Id),
			classroomId: String(this.sala.Id),
			typ: this.typ,
		};
	}

	public get Klasa(): Klasa {
		return this.klasa;
	}

	public get Nauczyciel(): Nauczyciel {
		return this.nauczyciel;
	}

	public get Nazwa(): String {
		return this.nazwa_przedmiotu;
	}

	public get Dzien(): DniTygodnia {
		//nie wiem czy to nie mozna stringa?
		return this.dzien;
	}

	public get Typ(): TypLekcji {
		//nie wiem czy to nie mozna stringa?
		return this.typ;
	}

	public get Sala(): Sala {
		return this.sala;
	}

	public get NrLekcji(): number {
		return this.nr_lekcji;
	}

	public get Id(): number {
		return this.id;
	}
}

export default Lekcja;
