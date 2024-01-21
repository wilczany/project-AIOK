import React, { useEffect, useState } from "react";
import Sala from "../../models/sala";
import { getSala, getKlasy, postKlasa, getLekcje, deleteKlasa, putKlasa } from "../../services/DatabaseService";
import Zajecia from "../../models/lekcja";
import Klasa from "../../models/klasa";
import Nauczyciel from "../../models/nauczyciel";
import KomorkaLekcji from "../tabela/KomorkaLekcji";
import ListaKlas from "../lista/ListaKlas";
//komponent od debugowania/zabawy bo szkoda mi smiecic App.tsx

function Piaskownica(): React.ReactNode {
	const [sala, setSala] = useState<Sala | null>(null);
	const [lekcjeList, setLekcjeList] = useState<any[]>([]);
	const [klasyList, setKlasyList] = useState<any[]>([]);
	const [i, setI] = useState<number>(4);

	//ten hook od czwartej linijki staje sie crashem bandicootem
	useEffect(() => {
		let sala1Promise = getSala(1);
		sala1Promise.then((param) => setSala(param));

		let lekcjePromise = getLekcje();
		lekcjePromise.then((lista) => {
			lista.forEach((lekcja) => {
				setLekcjeList((lekcjeList) => [...lekcjeList, lekcja]);
			});
		});

		let klasyPromise = getKlasy();
		klasyPromise.then((lista) => {
			lista.forEach((klasa) => {
				setKlasyList((klasyList) => [...klasyList, klasa]);
			});
		});
	}, []);

	// useEffect(() => {
	// 	if (klasyList.length > 0) {
	// 		console.log(klasyList[klasyList.length - 1]);
	// 		let kl = Klasa.copyFactory(klasyList[klasyList.length - 1]);

	// 		putKlasa(kl);
	// 	}
	// }, [klasyList]);

	return (
		<div style={{ backgroundColor: "#f6d7b0", width: "1200px", height: "800px", color: "black" }}>
			<p>piaskownica do debugu</p>
			<p>{sala?.Id}</p>

			{lekcjeList.map((lekcja) => {
				return <KomorkaLekcji lesson={lekcja}></KomorkaLekcji>;
			})}

			{klasyList.map((klasa) => {
				return <p>Klasa {klasa.Rg}</p>;
			})}
		</div>
	);
}

export default Piaskownica;
