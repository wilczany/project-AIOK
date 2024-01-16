import React, { useEffect, useState } from "react";
import Sala from "../models/sala";
import { getFetchSala, getFetchZajecia, getFetchKlasy } from "../services/DatabaseService";
import Zajecia from "../models/zajecia";
import Klasa from "../models/klasa";
import Nauczyciel from "../models/nauczyciel";
import KomorkaZajec from "./KomorkaZajec";
//komponent od debugowania/zabawy bo szkoda mi smiecic App.tsx

function Piaskownica(): React.ReactNode {
	const [sala, setSala] = useState<Sala | null>(null);
	const [zajeciaList, setZajeciaList] = useState<any[]>([]);
	const [klasyList, setKlasyList] = useState<any[]>([]);

	//ten hook od czwartej linijki staje sie crashem bandicootem
	useEffect(() => {
		let sala1Promise = getFetchSala(1);
		sala1Promise.then((param) => setSala(param));

		let zajeciaPromise = getFetchZajecia();
		zajeciaPromise.then((lista) => {
			lista.forEach((zaj) => {
				setZajeciaList((zajeciaList) => [...zajeciaList, zaj]);
			});
		});

		let klasyPromise = getFetchKlasy();
		klasyPromise.then((lista) => {
			lista.forEach((klasa) => {
				setKlasyList((klasyList) => [...klasyList, klasa]);
			});
		});
	}, []);

	return (
		<div style={{ backgroundColor: "#f6d7b0", width: "1200px", height: "800px", color: "black" }}>
			<p>piaskownica do debugu</p>
			<p>{sala?.Id}</p>

			{zajeciaList.map((zaj) => {
				return <KomorkaZajec lesson={zaj}></KomorkaZajec>;
			})}

			{klasyList.map((klasa) => {
				return <p>Klasa {klasa.Id}</p>;
			})}
		</div>
	);
}
export default Piaskownica;
