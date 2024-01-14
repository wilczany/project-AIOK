import './App.css';
import { Component, ReactNode } from 'react';

//do debuga tylko
import DniTygodnia from './models/dniTygodnia';
import Klasa from './models/klasa';
import Nauczyciel from './models/nauczyciel';
import Sala from './models/sala';
import TypyZajec from './models/typyZajec';
import Zajecia from './models/zajecia';
import LessonCell from './LessonCell';
//kuniec debugowych

function App() {

//start debugowego tekstu z poprzedniego projektu, sry za spam
  let debugNauczyciele: Nauczyciel[] = [
    new Nauczyciel("Adrian", "Nowak", "średnie", "kochampiwo@gmail.com"),
    new Nauczyciel("Adam", "Szulc", "średnie", "miau3127@mail.com"),
    new Nauczyciel("Teodor", "Kleks", "wyższe", "jankabel@o2.pl")
  ];
  let debugKlasy: Klasa[] = [
    new Klasa(1, "A", 30, debugNauczyciele[0], "kosmetologia"),
    new Klasa(1, "C", 30, debugNauczyciele[1], "architektura"),
    new Klasa(2, "B", 30, debugNauczyciele[2], "mat-fiz")
  ];
  let debugSale: Sala[] = [
    new Sala(1,1,30),
    new Sala(1,2,30)
  ]
  let debugZajecia: Zajecia[] = [
    //klasa 1A
    new Zajecia("Matematyka", 1, DniTygodnia.pon, debugKlasy[0], debugNauczyciele[0], debugSale[0], TypyZajec.zaj),
    new Zajecia("Fizyka", 2, DniTygodnia.pon, debugKlasy[0], debugNauczyciele[0], debugSale[0], TypyZajec.zaj),
    new Zajecia("Nanomaszyneria", 3, DniTygodnia.pon, debugKlasy[0], debugNauczyciele[2], debugSale[0], TypyZajec.zaj),

    //klasa 1C
    new Zajecia("Język polski", 1, DniTygodnia.pon, debugKlasy[1], debugNauczyciele[1], debugSale[1], TypyZajec.zaj),
    new Zajecia("Język niemiecki", 4, DniTygodnia.pon, debugKlasy[1], debugNauczyciele[0], debugSale[0], TypyZajec.zaj),
    new Zajecia("Historia", 5, DniTygodnia.pon, debugKlasy[1], debugNauczyciele[0], debugSale[0], TypyZajec.zaj),

    //klasa 2B
    new Zajecia("Wiedza o społeczeństwie", 3, DniTygodnia.pon, debugKlasy[2], debugNauczyciele[2], debugSale[1], TypyZajec.zaj),
    new Zajecia("Wychowanie fizyczne", 2, DniTygodnia.pon, debugKlasy[2], debugNauczyciele[1], debugSale[1], TypyZajec.zaj),
    new Zajecia("Matematyka", 6, DniTygodnia.pon, debugKlasy[2], debugNauczyciele[1], debugSale[0], TypyZajec.zaj),
  ];  
//kuniec debugowych

  return (
    <div className="App">
      <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <p>
          GitHub Codespaces(niefajne, musiałem naprawiać dla windowsa) <span className="heart">♥️</span> React
        </p>
        <p className="small">
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p> 
          {/* test komponentu */}
          {debugZajecia.map(zaj => { return <p><LessonCell lesson={zaj}></LessonCell></p> })}
        </p>
      </header>
    </div>
  );
}

export default App;
