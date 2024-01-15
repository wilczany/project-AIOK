import { useEffect, useState } from "react";
import Klasa from "../models/klasa";
import Nauczyciel from "../models/nauczyciel";
import Sala from "../models/sala";
import Zajecia from "../models/zajecia";

export function getFetchKlasy(): Promise<Klasa[]> {
	return fetch("http://localhost:3001/grades")
		.then((res) => res.json())
		.then((list) => {
			let klasaList: Klasa[] = [];
			list.forEach((params: any) => {
				let nKlasa = new Klasa(
					parseInt(params.id),
					parseInt(params.rok),
					params.grupa,
					parseInt(params.liczba_uczniow),
					parseInt(params.teacherId),
					params.profil
				);
				klasaList.push(nKlasa);
			});
			return klasaList;
		});
}
export function getFetchKlasa(id: number): Promise<Klasa> {
	return fetch(`http://localhost:3001/classrooms/${id}?_embed=teacher`)
		.then((response) => response.json())
		.then((params) => {
			return new Klasa(
				parseInt(params.id),
				parseInt(params.rok),
				params.string,
				parseInt(params.liczba_uczniow),
				parseInt(params.teacherId),
				params.profil
			);
		}) as Promise<Klasa>;
}

export function getFetchNauczyciele(): Promise<Nauczyciel[]> {
	return fetch("http://localhost:3001/teachers")
		.then((res) => res.json())
		.then((list) => {
			let nauczycielList: Nauczyciel[] = [];
			list.forEach((params: any) => {
				let nNauczyciel = new Nauczyciel(
					parseInt(params.id),
					params.imie,
					params.nazwisko,
					params.wyksztalcenie,
					params.email
				);
				nauczycielList.push(nNauczyciel);
			});
			return nauczycielList;
		});
}
export function getFetchNauczyciel(id: number): Promise<Nauczyciel> {
	return fetch(`http://localhost:3001/classrooms/${id}`)
		.then((response) => response.json())
		.then((params) => {
			return new Nauczyciel(
				parseInt(params.id),
				params.imie,
				params.nazwisko,
				params.wyksztalcenie,
				params.email
			);
		}) as Promise<Nauczyciel>;
}

export function getFetchSale() {
	return fetch("http://localhost:3001/classrooms")
		.then((res) => res.json())
		.catch(console.log) as Promise<Sala[]>;
}

export function getFetchSala(id: number): Promise<Sala> {
	return fetch(`http://localhost:3001/classrooms/${id}`)
		.then((response) => response.json())
		.then((params) => {
			return new Sala(
				parseInt(params.id),
				parseInt(params.pietro),
				parseInt(params.numer),
				parseInt(params.pojemnosc)
			);
		}) as Promise<Sala>;
}

//brakuje wychowawcy do klasy...
export function getFetchZajecia(): Promise<Zajecia[]> {
	return fetch("http://localhost:3001/lessons?_embed=classroom&_embed=teacher&_embed=grade")
		.then((response) => response.json())
		.catch(console.log) as Promise<Zajecia[]>;
	// .then((response) => {
	// 	let r = response.json();
	// 	console.log("fetch response", r);
	// 	return r;
	// })
	// .then((zajList) => {
	// 	zajList.forEach((zaj) => {
	// 		console.log("fetch zaj", zaj);
	// 		console.log("nan??", zaj.grade.rok);
	// 		let wychowawca = getFetchNauczyciel(parseInt(zaj.grade.teacherId));
	// 		let wychowawcaObject: Nauczyciel;
	// 		wychowawca.then((w) => (wychowawcaObject = w));
	// 		let zajObject = new Zajecia(
	// 			zaj.id,
	// 			zaj.nazwa_przedmiotu,
	// 			zaj.nr_lekcji,
	// 			zaj.dzien,
	// 			new Klasa(
	// 				parseInt(zaj.grade.id),
	// 				parseInt(zaj.grade.rok),
	// 				zaj.grade.grupa,
	// 				parseInt(zaj.grade.liczba_uczniow),
	// 				parseInt(zaj.grade.teacherId),
	// 				zaj.grade.profil
	// 			),
	// 			new Nauczyciel(
	// 				parseInt(zaj.teacher.id),
	// 				zaj.teacher.imie,
	// 				zaj.teacher.nazwisko,
	// 				zaj.teacher.wyksztalcenie,
	// 				zaj.teacher.email
	// 			),
	// 			new Sala(
	// 				parseInt(zaj.classroom.id),
	// 				parseInt(zaj.classroom.pietro),
	// 				parseInt(zaj.classroom.numer),
	// 				parseInt(zaj.classroom.pojemnosc)
	// 			),
	// 			zaj.typZajec
	// 		);
	// 		console.log("zajObject", zajObject);
	// 		return zajObject;
	// 	});
	// });
	// .then((response) => console.log(response))
	// .catch(console.log) as Promise<Zajecia[]>;
}

// export function getZajecia(): Promise<Zajecia[]> {
// 	let g = getFetchZajecia();
// 	g.for;
// }

// useEffect(() => {
// 	let sala1Promise = getFetchSala(1);
// 	sala1Promise.then((param) => setSala(param));

// 	let zajeciaPromise = getFetchZajecia();
// 	zajeciaPromise.then((zajList) =>
// 		zajList.forEach((zaj) => {
// 			console.log("zajList->zaj:");
// 			console.log(zaj);
// 			var zajObject = new Zajecia(
// 				zaj.id,
// 				zaj.nazwa_przedmiotu,
// 				zaj.nr_lekcji,
// 				zaj.dzien,
// 				new Klasa(
// 					parseInt(zaj.grade.id),
// 					parseInt(zaj.grade.rok),
// 					zaj.grade.grupa,
// 					parseInt(zaj.grade.liczba_uczniow),
// 					zaj.grade.teacherId,
// 					zaj.grade.profil
// 				),
// 				new Nauczyciel(
// 					parseInt(zaj.teacher.id),
// 					zaj.teacher.imie,
// 					zaj.teacher.nazwisko,
// 					zaj.teacher.wyksztalcenie,
// 					zaj.teacher.email
// 				),
// 				new Sala(
// 					parseInt(zaj.classroom.id),
// 					parseInt(zaj.classroom.pietro),
// 					parseInt(zaj.classroom.numer),
// 					parseInt(zaj.classroom.pojemnosc)
// 				),
// 				zaj.typZajec
// 			);
// 			console.log(zajeciaList);
// 			setZajeciaList((zajeciaList) => [...zajeciaList, zajObject]);
// 		})
// 	);
// }, []);
