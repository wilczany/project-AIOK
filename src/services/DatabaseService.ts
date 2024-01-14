import Klasa from "../models/klasa";
import Nauczyciel from "../models/nauczyciel";
import Sala from "../models/sala";
import Zajecia from "../models/zajecia";

export function getFetchKlasy() {
	let result = fetch("http://localhost:3001/grades")
		.then((res) => res.json())
		.catch(console.log);
	return result as Promise<Klasa[]>;
}
export function getFetchNauczyciele() {
	let result = fetch("http://localhost:3001/teachers")
		.then((res) => res.json())
		.catch(console.log);
	return result as Promise<Nauczyciel[]>;
}
export function getFetchNauczyciel(id: number) {
	fetch(`http://localhost:3001/teachers/${id}`)
		.then((response) => response.json())
		.then((params) =>
			console.log(
				new Nauczyciel(parseInt(params.id), params.imie, params.nazwisko, params.wyksztalcenie, params.email)
			)
		);
}

export function getFetchSale() {
	let result = fetch("http://localhost:3001/classrooms")
		.then((res) => res.json())
		.catch(console.log);
	return result as Promise<Sala[]>;
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
export function getFetchZajecia() {
	return fetch("http://localhost:3001/lessons?_embed=classroom&_embed=teacher&_embed=grade").then((response) =>
		response.json()
	);
}
