import React, { useEffect, useState } from "react";
import Lekcja from "../models/lekcja";
import { getLekcja } from "../services/DatabaseService";
import { useParams } from "react-router-dom";
import godzinyLekcyjne from "../models/godzinyLekcyjne";
import GodzinaLekcyjna from "../models/godzinaLekcyjna";

type RouteParams = {
	id: string;
};

const OpisLekcji = () => {
	const { id } = useParams<RouteParams>();
	const [lekcja, setLekcja] = useState<Lekcja>();
	const [properId, setProperId] = useState<boolean>(false);
	const [timeStr, setTimeStr] = useState<string>("");

	useEffect(() => {
		let lId = parseInt(id!);

		if (Number.isNaN(lId)) {
			setProperId(false);
			return;
		}

		let lekcjaPromise = getLekcja(lId).then(
			(lek) => {
				setProperId(true);
				setTimeStr(godzinyLekcyjne[lek.NrLekcji - 1].toString());
				setLekcja(Lekcja.copyFactory(lek));
			},
			(reason) => {
				setProperId(false);
			}
		);
		setProperId(true);
	}, []);

	return (
		<div className="opis">
			{!properId && <h3>Błąd przy wczytywaniu lekcji o podanym id.</h3>}
			{properId && (
				<>
					<p>
						{lekcja?.Nazwa}, {lekcja?.DzienAsString} {timeStr}
					</p>
					<p>
						Klasa: {lekcja?.Klasa.Rg}, profil {lekcja?.Klasa.Profil}
					</p>
					<p>
						Prowadzący: {lekcja?.Nauczyciel.FullName}, {lekcja?.Nauczyciel.Wyksztalcenie}
					</p>
					<p>Typ zajęć: {lekcja?.TypAsString}</p>
					<p>Sala: {lekcja?.Sala.Pn}</p>
				</>
			)}
		</div>
	);
};

export default OpisLekcji;
