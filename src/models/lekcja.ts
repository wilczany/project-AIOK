import Klasa from "./klasa";
import Nauczyciel from "./nauczyciel";
import Sala from "./sala";
import DniTygodnia from "./dniTygodnia";
import TypLekcji from "./typyLekcji";

//GETTERY NAGLE ZACZELY ZWRACAC ZAWSZE UNDEFINED, STAD TE PUBLIC
class Lekcja {
	public id: number;
	public nazwa_przedmiotu: string; // (obowiązkowy, max 30 małych/dużych liter)
	public nr_lekcji: number;
	public dzien: DniTygodnia; //; (obowiązkowy, od poniedziałku do piątku)
	public klasa: Klasa; //(obowiązkowy)
	public nauczyciel: Nauczyciel; //(obowiązkowy)
	public sala: Sala; //(obowiązkowy)
	public typ: TypLekcji; //(możliwe 2 do wyboru: konsultacje, zajęcia)

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

	public static copyFactory(lek: Lekcja): Lekcja {
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
			nazwa: this.nazwa_przedmiotu,
			nr_lekcji: String(this.nr_lekcji),
			dzienTygodnia: this.dzien,
			gradeId: String(this.klasa.id),
			teacherId: String(this.nauczyciel.id),
			classroomId: String(this.sala.id),
			typ: this.typ,
		};
	}

	//chciałem użyć instanceof zamiast in, ale niestety po ciągłym false oraz paru testach wyszło, że wszystkie utworzone obiekty były typu Object już przy tworzeniu w DatabaseService... sklonowane tak samo
	public objectHasLesson(object: Klasa | Nauczyciel | Sala): boolean {
		if ("idWychowawcy" in object) {
			if (JSON.stringify(object) === JSON.stringify(this.klasa)) return true;
		}
		if ("email" in object) {
			if (JSON.stringify(object) === JSON.stringify(this.nauczyciel)) return true;
		}
		if ("pietro" in object) {
			if (JSON.stringify(object) === JSON.stringify(this.sala)) return true;
		}

		return false;
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
		return this.dzien;
	}

	public get DzienAsString(): string {
		return DniTygodnia[this.dzien];
	}

	public get Typ(): TypLekcji {
		return this.typ;
	}

	public get TypAsString(): string {
		return TypLekcji[this.typ];
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
