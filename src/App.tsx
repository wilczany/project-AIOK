import "./App.css";
import { Component, ReactNode, useEffect } from "react";
import { useState } from "react";

//do debuga tylko
import Piaskownica from "./components/Piaskownica";
import DniTygodnia from "./models/dniTygodnia";
import Klasa from "./models/klasa";
import Nauczyciel from "./models/nauczyciel";
import Sala from "./models/sala";
import TypyZajec from "./models/typyZajec";
import Zajecia from "./models/zajecia";
import KomorkaZajec from "./components/KomorkaZajec";
import { getFetchSala } from "./services/DatabaseService";
import ListaKlas from "./components/ListaKlas";
//kuniec debugowych

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src="Octocat.png" className="App-logo" alt="logo" />
				<p>
					GitHub Codespaces(niefajne, musiałem naprawiać dla windowsa) <span className="heart">♥️</span> React
				</p>
				{/* <Piaskownica></Piaskownica> */}
				<p className="small">
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<ListaKlas></ListaKlas>
			</header>
		</div>
	);
}

export default App;
