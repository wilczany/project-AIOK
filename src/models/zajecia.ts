import Klasa from "./klasa";
import Nauczyciel from "./nauczyciel";
import Sala from "./sala";
import DniTygodnia from "./dniTygodnia";
import TypZajec from "./typyZajec";

class Zajecia {
	private id: number;
	private nazwa_przedmiotu: string; // (obowiązkowy, max 30 małych/dużych liter)
	private nr_lekcji: number;
	private dzien: DniTygodnia; //; (obowiązkowy, od poniedziałku do piątku)
	private klasa: Klasa; //(obowiązkowy)
	private nauczyciel: Nauczyciel; //(obowiązkowy)
	private sala: Sala; //(obowiązkowy)
	private typ: TypZajec; //(możliwe 2 do wyboru: konsultacje, zajęcia)

	constructor(
		id: number,
		nazwa_przedmiotu: string,
		nr_lekcji: number,
		dzien: DniTygodnia,
		klasa: Klasa,
		nauczyciel: Nauczyciel,
		sala: Sala,
		typ: TypZajec
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

	public static copyFactory(zaj: Zajecia) {
		const zajecia = new Zajecia(
			zaj.id,
			zaj.nazwa_przedmiotu,
			zaj.nr_lekcji,
			zaj.dzien,
			zaj.klasa,
			zaj.nauczyciel,
			zaj.sala,
			zaj.typ
		);
		return zajecia;
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

	public get Typ(): TypZajec {
		//nie wiem czy to nie mozna stringa?
		return this.typ;
	}

	public get Sala(): Sala {
		return this.sala;
	}

	public get NrLekcji(): number {
		return this.nr_lekcji;
	}
}

export default Zajecia;
