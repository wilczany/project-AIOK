class GodzinaLekcyjna {
	private minuty: number;
	private godzina: number;

	public constructor(godzina: number, minuty: number) {
		this.godzina = godzina;
		this.minuty = minuty;
	}

	public toString(): string {
		return this.godzina + ":" + this.minuty;
	}

	public dodajMinuty(minuty: number): void {
		this.minuty += minuty;
		while (minuty >= 60) {
			this.godzina += 1;
			this.minuty -= 60;
		}
	}

	public get koniecLekcji(): GodzinaLekcyjna {
		let koniec = new GodzinaLekcyjna(this.godzina, this.minuty);
		koniec.dodajMinuty(45);
		return koniec;
	}
}

export default GodzinaLekcyjna;
