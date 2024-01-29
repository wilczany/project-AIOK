import React, { SyntheticEvent, useEffect, useState } from "react";
import Klasa from "../models/klasa";
import Nauczyciel from "../models/nauczyciel";
import Sala from "../models/sala";
import { getKlasy, getLekcje, getNauczyciele, getSale } from "../services/DatabaseService";
import Lekcja from "../models/lekcja";
import Rozklad from "./tabela/Rozklad";
import DodajLekcje from "./dodaj/DodajLekcje";

function KreatorLekcji(): React.ReactNode {
	const [klasyList, setKlasyList] = useState<Klasa[]>([]);
	const [nauczycieleList, setNauczycieleList] = useState<Nauczyciel[]>([]);
	const [saleList, setSaleList] = useState<Sala[]>([]);
	const [lekcjeList, setLekcjeList] = useState<Lekcja[]>([]);
	const [selectedKlasa, setSelectedKlasa] = useState<Klasa | null>(null);
	const [selectedLekcjeKlasy, setSelectedLekcjeKlasy] = useState<Lekcja[]>([]);
	const [selectedNauczyciel, setSelectedNauczyciel] = useState<Nauczyciel | null>(null);
	const [selectedLekcjeNauczyciela, setSelectedLekcjeNauczyciela] = useState<Lekcja[]>([]);
	const [selectedSala, setSelectedSala] = useState<Sala | null>(null);
	const [selectedLekcjeSali, setSelectedLekcjeSali] = useState<Lekcja[]>([]);

	function appendLekcjeList(lekcja: Lekcja) {
		setLekcjeList((lekcjeList) => [...lekcjeList, lekcja]);
	}

	//TODO zamiast objectOnClick na klasie oddzielny handler dla kazdego selecta z podobnym dzialaniem, przypisanie do oddzielnych selected
	// const objectOnClick = (event: SyntheticEvent) => {
	// 	let element = event.target as HTMLElement;
	// 	let data: string | null = element.getAttribute("data-klasa");
	// 	if (data != null) {
	// 		let klasa: Klasa = JSON.parse(data);
	// 		setSelectedObject(klasa);
	// 		return;
	// 	}
	// 	data = element.getAttribute("data-nauczyciel");
	// 	if (data != null) {
	// 		let nauczyciel: Nauczyciel = JSON.parse(data);
	// 		setSelectedObject(nauczyciel);
	// 		return;
	// 	}
	// 	data = element.getAttribute("data-sala");
	// 	if (data != null) {
	// 		let sala: Sala = JSON.parse(data);
	// 		setSelectedObject(sala);
	// 		return;
	// 	}
	// };

	//ładowanie danych
	useEffect(() => {
		let klasyPromise: Promise<Klasa[]> = getKlasy();
		klasyPromise
			.then((klasy) =>
				klasy.forEach((klasa) => {
					let klasaObject: Klasa = Klasa.copyFactory(klasa);
					setKlasyList((klasyList) => [...klasyList, klasaObject]);
				})
			)
			.finally(() => setSelectedKlasa(klasyList[0]));

		let nauczycielePromise: Promise<Nauczyciel[]> = getNauczyciele();
		nauczycielePromise
			.then((nauczyciele) =>
				nauczyciele.forEach((nauczyciel) => {
					let nauczycielObject: Nauczyciel = Nauczyciel.copyFactory(nauczyciel);
					setNauczycieleList((nauczycieleList) => [...nauczycieleList, nauczycielObject]);
				})
			)
			.finally(() => setSelectedNauczyciel(nauczycieleList[0]));

		let salePromise: Promise<Sala[]> = getSale();
		salePromise
			.then((sale) =>
				sale.forEach((sala) => {
					let salaObject: Sala = Sala.copyFactory(sala);
					setSaleList((saleList) => [...saleList, salaObject]);
				})
			)
			.finally(() => setSelectedSala(saleList[0]));

		let lekcjePromise: Promise<Lekcja[]> = getLekcje();
		lekcjePromise.then((lekcje) =>
			lekcje.forEach((lekcja) => {
				let lekcjaObject: Lekcja = Lekcja.copyFactory(lekcja);
				setLekcjeList((lekcjeList) => [...lekcjeList, lekcjaObject]);
			})
		);
	}, []);

	//aktualizowanie list dla rozkładów przy zmianie wybranej klasy/nauczyciela/sali
	useEffect(() => {
		setSelectedLekcjeKlasy([]);
		if (selectedKlasa != null) {
			lekcjeList.forEach((lekcja) => {
				if (lekcja.objectHasLesson(selectedKlasa)) {
					setSelectedLekcjeKlasy((selectedLekcjeKlasy) => [...selectedLekcjeKlasy, lekcja]);
				}
			});
		}
	}, [selectedKlasa]);

	useEffect(() => {
		setSelectedLekcjeNauczyciela([]);
		if (selectedNauczyciel != null) {
			lekcjeList.forEach((lekcja) => {
				if (lekcja.objectHasLesson(selectedNauczyciel)) {
					setSelectedLekcjeNauczyciela((selectedLekcjeNauczyciela) => [...selectedLekcjeNauczyciela, lekcja]);
				}
			});
		}
	}, [selectedNauczyciel]);

	useEffect(() => {
		setSelectedLekcjeSali([]);
		if (selectedSala != null) {
			lekcjeList.forEach((lekcja) => {
				if (lekcja.objectHasLesson(selectedSala)) {
					setSelectedLekcjeSali((selectedLekcjeSali) => [...selectedLekcjeSali, lekcja]);
				}
			});
		}
	}, [selectedSala]);

	return (
		<>
			<DodajLekcje
				klasyList={klasyList}
				nauczycieleList={nauczycieleList}
				saleList={saleList}
				lekcjeList={lekcjeList}
				appendLekcjeList={appendLekcjeList}
				setSelectedKlasa={setSelectedKlasa}
				setSelectedNauczyciel={setSelectedNauczyciel}
				setSelectedSala={setSelectedSala}
			/>
			<Rozklad lekcjeList={selectedLekcjeKlasy}></Rozklad>
			<Rozklad lekcjeList={selectedLekcjeNauczyciela}></Rozklad>
			<Rozklad lekcjeList={selectedLekcjeSali}></Rozklad>
		</>
	);
}

export default KreatorLekcji;
