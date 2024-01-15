import Klasa from "../models/klasa";
import Nauczyciel from "../models/nauczyciel";
import Sala from "../models/sala";
import Zajecia from "../models/zajecia";

export function getFetchKlasy(): Promise<Klasa[]> {
	return fetch("http://localhost:3001/grades")
		.then((res) => res.json())
		.catch(console.log) as Promise<Klasa[]>;
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
				new Nauczyciel(
					parseInt(params.teacher.id),
					params.teacher.imie,
					params.teacher.nazwisko,
					params.teacher.wyksztalcenie,
					params.teacher.email
				),
				params.profil
			);
		}) as Promise<Klasa>;
}

export function getFetchNauczyciele(): Promise<Nauczyciel[]> {
	return fetch("http://localhost:3001/teachers")
		.then((res) => res.json())
		.catch(console.log) as Promise<Nauczyciel[]>;
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
}
