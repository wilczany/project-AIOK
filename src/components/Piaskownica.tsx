import React, { useEffect, useState } from "react";
import Sala from "../models/sala";
import { getFetchSala, getFetchZajecia } from "../services/DatabaseService";
import Zajecia from "../models/zajecia";
import Klasa from "../models/klasa";
import Nauczyciel from "../models/nauczyciel";
import KomorkaZajec from "./KomorkaZajec";
//komponent od debugowania/zabawy bo szkoda mi smiecic App.tsx

function Piaskownica(): React.ReactNode {
	const [sala, setSala] = useState<Sala | null>(null);
	const [zajeciaList, setZajeciaList] = useState<any[]>([]);

	//ten hook od czwartej linijki staje sie crashem bandicootem
	useEffect(() => {
		let sala1Promise = getFetchSala(1);
		sala1Promise.then((param) => setSala(param));

		let zajeciaPromise = getFetchZajecia();
		zajeciaPromise.then((zajList) =>
			zajList.forEach((zaj) => {
				var zajObject = new Zajecia(
					zaj.id,
					zaj.nazwa_przedmiotu,
					zaj.nr_lekcji,
					zaj.dzien,
					new Klasa(
						parseInt(zaj.grade.id),
						parseInt(zaj.grade.rok),
						zaj.grade.grupa,
						parseInt(zaj.grade.liczba_uczniow),
						zaj.grade.teacherId,
						zaj.grade.profil
					),
					new Nauczyciel(
						parseInt(zaj.teacher.id),
						zaj.teacher.imie,
						zaj.teacher.nazwisko,
						zaj.teacher.wyksztalcenie,
						zaj.teacher.email
					),
					new Sala(
						parseInt(zaj.classroom.id),
						parseInt(zaj.classroom.pietro),
						parseInt(zaj.classroom.numer),
						parseInt(zaj.classroom.pojemnosc)
					),
					zaj.typZajec
				);
				console.log(zajeciaList);
				setZajeciaList((zajeciaList) => [...zajeciaList, zajObject]);
			})
		);
	}, []);

	return (
		<div style={{ backgroundColor: "#f6d7b0", width: "1200px", height: "800px", color: "black" }}>
			<p>piaskownica do debugu</p>
			<p>{sala?.Id}</p>
			{zajeciaList.map((zaj) => {
				return <KomorkaZajec lesson={zaj}></KomorkaZajec>;
			})}
		</div>
	);
}
export default Piaskownica;
