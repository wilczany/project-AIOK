import React, { SyntheticEvent, useEffect, useState } from "react";
import Klasa from "../models/klasa";
import { getKlasy } from "../services/DatabaseService";
import ListaKlas from "./lista/ListaKlas";
import DodajKlase from "./dodaj/DodajKlase";

function Klasy(): React.ReactNode {
	const [klasyList, setKlasyList] = useState<Klasa[]>([]);
	const [listLoaded, setListLoaded] = useState<boolean>(false);

	function appendKlasyList(klasa: Klasa) {
		setKlasyList((klasyList) => [...klasyList, klasa]);
	}

	const objectOnClick = (event: SyntheticEvent) => {
		//TODO dodawanie przycisku EDYTUJ oraz USUŃ
	};

	useEffect(() => {
		if (!listLoaded) {
			let klasyPromise: Promise<Klasa[]> = getKlasy();
			console.log(klasyPromise);
			klasyPromise.then((klasy) =>
				klasy.forEach((klasa) => {
					let klasaObject: Klasa = Klasa.copyFactory(klasa);
					setKlasyList((klasyList) => [...klasyList, klasaObject]);
				})
			);
			setListLoaded(true);
		}
	}, [klasyList]);

	return (
		<>
			<ListaKlas klasyList={klasyList} />
			<DodajKlase appendKlasyList={appendKlasyList} />
		</>
	);
}

export default Klasy;
