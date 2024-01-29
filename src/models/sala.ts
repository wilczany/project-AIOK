//GETTERY NAGLE ZACZELY ZWRACAC ZAWSZE UNDEFINED, STAD TE PUBLIC

class Sala {
	public id: number;
	public pietro: number; //(obowiązkowe, od 0 do 3)
	public numer: number; //(obowiązkowe, od 1 do 99)
	public pojemnosc: number; //(obowiązkowe, od 10 do 32)

	constructor(id: number, pietro: number, numer: number, pojemnosc: number) {
		this.id = id;
		this.pietro = pietro;
		this.numer = numer;
		this.pojemnosc = pojemnosc;
	}

	public static copyFactory(sala: Sala) {
		let newSala = new Sala(sala.id, sala.pietro, sala.numer, sala.pojemnosc);
		return newSala;
	}
	public get JSONized(): any {
		return {
			id: String(this.id),
			pietro: String(this.pietro),
			numer: String(this.numer),
			pojemnosc: String(this.pojemnosc),
		};
	}

	public get Id(): number {
		return this.id;
	}

	public get Pietro(): number {
		return this.pietro;
	}

	public get Numer(): number {
		return this.numer;
	}

	public get Pn(): string {
		if (this.numer > 9) return `${this.pietro}${this.numer}`;
		else return `${this.pietro}0${this.numer}`;
	}

	public get Pojemnosc(): number {
		return this.pojemnosc;
	}
}

export default Sala;
