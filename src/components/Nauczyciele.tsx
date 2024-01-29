import React, { useEffect, useState } from "react";
import Nauczyciel from "../models/nauczyciel";
import { deleteNauczyciel, getNauczyciele } from "../services/DatabaseService";
import ListaNauczycieli from "./lista/ListaNauczycieli";
import DodajNauczyciela from "./dodaj/DodajNauczyciela";

function Nauczyciele(): React.ReactNode {
	const [listLoaded, setListLoaded] = useState<boolean>(false);
	const [nauczycieleList, setNauczycieleList] = useState<any[]>([]);

	function appendNauczycieleList(nauczyciel: Nauczyciel) {
		setNauczycieleList((nauczycieleList) => [...nauczycieleList, nauczyciel]);
	}

	const objectOnClick = (event: React.SyntheticEvent) => {
		let el = event.target as Element;
		let td = el.parentElement;
		let nauczyciel: Nauczyciel = JSON.parse(td!.getAttribute("data-nauczyciel")!);
		deleteNauczyciel(nauczyciel.id);
		setListLoaded(false);
		setNauczycieleList([]);
	};

	useEffect(() => {
		if (!listLoaded) {
			let nauczycielePromise: Promise<Nauczyciel[]> = getNauczyciele();
			nauczycielePromise.then((nauczyciele) =>
				nauczyciele.forEach((nauczyciel) => {
					let nauczycielObject: Nauczyciel = Nauczyciel.copyFactory(nauczyciel);
					appendNauczycieleList(nauczycielObject);
				})
			);
			setListLoaded(true);
		}
	}, [nauczycieleList]);

	return (
		<>
			<ListaNauczycieli nauczycieleList={nauczycieleList} objectOnClick={objectOnClick} controlButtons={true} />
			<DodajNauczyciela appendNauczycieleList={appendNauczycieleList} />
		</>
	);
}

export default Nauczyciele;
