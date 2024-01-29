import React, { SyntheticEvent, useEffect, useState } from "react";
import Klasa from "../models/klasa";
import { deleteKlasa, getKlasy } from "../services/DatabaseService";
import ListaKlas from "./lista/ListaKlas";
import DodajKlase from "./dodaj/DodajKlase";

function Klasy(): React.ReactNode {
	const [klasyList, setKlasyList] = useState<Klasa[]>([]);
	const [klasyExtendedList, setKlasyExtendedList] = useState<boolean[]>([]);
	const [listLoaded, setListLoaded] = useState<boolean>(false);

	function appendKlasyList(klasa: Klasa) {
		setKlasyList((klasyList) => [...klasyList, klasa]);
	}

	const objectOnClick = (event: SyntheticEvent) => {
		let el = event.target as Element;
		let td = el.parentElement;
		let klasa: Klasa = JSON.parse(td!.getAttribute("data-klasa")!);
		deleteKlasa(klasa.id);
		setListLoaded(false);
		setKlasyList([]);
	};

	useEffect(() => {
		document.title = "Klasy";
		if (!listLoaded) {
			let klasyPromise: Promise<Klasa[]> = getKlasy();
			klasyPromise.then((klasy) =>
				klasy.forEach((klasa) => {
					let klasaObject: Klasa = Klasa.copyFactory(klasa);
					setKlasyList((klasyList) => [...klasyList, klasaObject]);
					setKlasyExtendedList((klasyExtendedList) => [...klasyExtendedList, false]);
				})
			);
			setListLoaded(true);
		}
	}, [klasyList]);

	return (
		<>
			<ListaKlas klasyList={klasyList} objectOnClick={objectOnClick} controlButtons={true} />
			<DodajKlase appendKlasyList={appendKlasyList} />
		</>
	);
}

export default Klasy;
