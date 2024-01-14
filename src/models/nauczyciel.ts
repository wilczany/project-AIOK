class Nauczyciel{ 
    private static id_indexer: number = 1;
    private id: number;
    private imie: string;  //(obowiązkowe, max 20 małych/dużych liter) 
    private nazwisko: string; //(obowiązkowe, max 20 małych/dużych liter) 
    private wyksztalcenie: string; //(obowiązkowe, max 20 małych/dużych liter) 
    private email: string; // ValidEmailString; //(obowiązkowe, max 40 znaków) 

    constructor(imie: string, nazwisko: string, wyksztalcenie: string, email: string){
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.wyksztalcenie = wyksztalcenie;
        this.email = email
        this.id = Nauczyciel.id_indexer;
        Nauczyciel.id_indexer += 1;
    }

    public get FullName(): string{
        return this.imie+' '+this.nazwisko
    }

    public get ShortName(): string{
        return this.imie[0]+'. '+this.nazwisko
    }

    public get Wyksztalcenie(): string{
        return this.wyksztalcenie
    }

    public get Email(): string{
        return this.email
    }

    public get Id(): number{
        return this.id
    }
} 

export default Nauczyciel