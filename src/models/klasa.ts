import Nauczyciel from "./nauczyciel"

class Klasa{ 
    private rok: number; //(obowiązkowe, od 1 do 8)
    private grupa: string //(obowiązkowe, od A do Z) 
    private liczba_uczniow: number; //(obowiązkowe, od 10 do max 32) 
    private wychowawca: Nauczyciel; //(obowiązkowe) 
    private profil: string; //(max 20 małych/dużych liter) 

    public constructor(rok: number, grupa: string, liczba_uczniow: number, wychowawca: Nauczyciel, profil: string)
    {
        this.rok = rok
        this.grupa = grupa
        this.liczba_uczniow = liczba_uczniow
        this.wychowawca = wychowawca
        this.profil = profil
    }

    public get Rok(): number{
        return this.rok
    }
    
    public get Grupa(): string{
        return this.grupa
    }

    public get Liczba_uczniow(): number{
        return this.liczba_uczniow
    }

    public get Profil(): string{
        return this.profil
    }

    //identyfikator Klasy to połączenie roku oraz grupy
    public get Id(): string{
        return `${this.rok}${this.grupa}` ?? `??`
    }

    public get Wychowawca(): Nauczyciel{
        return this.wychowawca
    }
} 

export default Klasa