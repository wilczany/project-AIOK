import React, { SyntheticEvent, useEffect, useState } from "react";
import ListaKlas from "../lista/ListaKlas";
import ListaNauczycieli from "../lista/ListaNauczycieli";
import ListaSal from "../lista/ListaSal";
import Klasa from "../../models/klasa";
import Nauczyciel from "../../models/nauczyciel";
import Sala from "../../models/sala";
import { getKlasy, getLekcje, getNauczyciele, getSale } from "../../services/DatabaseService";
import Lekcja from "../../models/lekcja";
import Rozklad from "./Rozklad";

function Rozklady(): React.ReactNode {
	const [klasyList, setKlasyList] = useState<Klasa[]>([]);
	const [nauczycieleList, setNauczycieleList] = useState<Nauczyciel[]>([]);
	const [saleList, setSaleList] = useState<Sala[]>([]);
	const [lekcjeList, setLekcjeList] = useState<Lekcja[]>([]);
	const [selectedObject, setSelectedObject] = useState<Klasa | Nauczyciel | Sala | null>(null);
	const [selectedLekcjeList, setSelectedLekcjeList] = useState<Lekcja[]>([]);

	function appendKlasyList(klasa: Klasa) {
		setKlasyList((klasyList) => [...klasyList, klasa]);
	}
	function appendNauczycieleList(nauczyciel: Nauczyciel) {
		setNauczycieleList((nauczycieleList) => [...nauczycieleList, nauczyciel]);
	}
	function appendSaleList(sala: Sala) {
		setSaleList((saleList) => [...saleList, sala]);
	}

	const objectOnClick = (event: SyntheticEvent) => {
		let element = event.target as HTMLElement;
		let data: string | null = element.getAttribute("data-klasa");
		if (data != null) {
			let klasa: Klasa = JSON.parse(data);
			setSelectedObject(klasa);
			return;
		}
		data = element.getAttribute("data-nauczyciel");
		if (data != null) {
			let nauczyciel: Nauczyciel = JSON.parse(data);
			setSelectedObject(nauczyciel);
			return;
		}
		data = element.getAttribute("data-sala");
		if (data != null) {
			let sala: Sala = JSON.parse(data);
			setSelectedObject(sala);
			return;
		}
	};

	//ładowanie danych
	useEffect(() => {
		let klasyPromise: Promise<Klasa[]> = getKlasy();
		klasyPromise.then((klasy) =>
			klasy.forEach((klasa) => {
				let klasaObject: Klasa = Klasa.copyFactory(klasa);
				setKlasyList((klasyList) => [...klasyList, klasaObject]);
			})
		);

		let nauczycielePromise: Promise<Nauczyciel[]> = getNauczyciele();
		nauczycielePromise.then((nauczyciele) =>
			nauczyciele.forEach((nauczyciel) => {
				let nauczycielObject: Nauczyciel = Nauczyciel.copyFactory(nauczyciel);
				setNauczycieleList((nauczycieleList) => [...nauczycieleList, nauczycielObject]);
			})
		);

		let salePromise: Promise<Sala[]> = getSale();
		salePromise.then((sale) =>
			sale.forEach((sala) => {
				let salaObject: Sala = Sala.copyFactory(sala);
				setSaleList((saleList) => [...saleList, salaObject]);
			})
		);

		let lekcjePromise: Promise<Lekcja[]> = getLekcje();
		lekcjePromise.then((lekcje) =>
			lekcje.forEach((lekcja) => {
				let lekcjaObject: Lekcja = Lekcja.copyFactory(lekcja);
				setLekcjeList((lekcjeList) => [...lekcjeList, lekcjaObject]);
			})
		);
	}, []);

	useEffect(() => {
		setSelectedLekcjeList([]);
		if (selectedObject != null) {
			lekcjeList.forEach((lekcja) => {
				if (lekcja.objectHasLesson(selectedObject)) {
					setSelectedLekcjeList((selectedLekcjeList) => [...selectedLekcjeList, lekcja]);
				}
			});
		}
	}, [selectedObject]);

	return (
		<>
			<ListaKlas klasyList={klasyList} objectOnClick={objectOnClick} />
			<ListaNauczycieli nauczycieleList={nauczycieleList} objectOnClick={objectOnClick} />
			<ListaSal saleList={saleList} objectOnClick={objectOnClick} />
			{/* {selectedLekcjeList.map((lekcja) => {
				return (
					<p>
						{lekcja.Nazwa} {lekcja.Klasa.Rg} {lekcja.Nauczyciel.ShortName} {lekcja.Sala.Pn}
					</p>
				);
			})} */}
			<Rozklad lekcjeList={selectedLekcjeList}></Rozklad>
		</>
	);
}

export default Rozklady;
