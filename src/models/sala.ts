class Sala {
  private id: number;
  private pietro: number; //(obowiązkowe, od 0 do 3)
  private numer: number; //(obowiązkowe, od 1 do 99)
  private pojemnosc: number; //(obowiązkowe, od 10 do 32)

  constructor(id: number, pietro: number, numer: number, pojemnosc: number) {
    this.id = id;
    this.pietro = pietro;
    this.numer = numer;
    this.pojemnosc = pojemnosc;
  }

  get Id(): string {
    if (this.numer > 9) return `${this.pietro}${this.numer}`;
    else return `${this.pietro}0${this.numer}`;
  }

  get Pojemnosc(): number {
    return this.pojemnosc;
  }
}

export default Sala;
