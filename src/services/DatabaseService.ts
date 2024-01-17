import axios from "axios";
import Klasa from "../models/klasa";
import Nauczyciel from "../models/nauczyciel";
import Sala from "../models/sala";
import Lekcja from "../models/lekcja";

//klasy
export function getKlasy(): Promise<Klasa[]> {
	return axios.get("http://localhost:3001/grades").then((response) => {
		let klasaList: Klasa[] = [];
		response.data.forEach((params: any) => {
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
	}) as Promise<Klasa[]>;
}

export function getKlasa(id: number): Promise<Klasa> {
	return axios.get(`http://localhost:3001/classrooms/${id}?_embed=teacher`).then((response) => {
		return new Klasa(
			parseInt(response.data.id),
			parseInt(response.data.rok),
			response.data.string,
			parseInt(response.data.liczba_uczniow),
			parseInt(response.data.teacherId),
			response.data.profil
		);
	}) as Promise<Klasa>;
}

export function postKlasa(klasa: Klasa) {
	axios.post("http://localhost:3001/grades", klasa.JSONized).then((response) => {
		console.log(response.status, response.data.token);
	});
}

//nauczyciele
export function getNauczyciele(): Promise<Nauczyciel[]> {
	return axios.get("http://localhost:3001/teachers").then((response) => {
		let nauczycielList: Nauczyciel[] = [];
		response.data.forEach((params: any) => {
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
	}) as Promise<Nauczyciel[]>;
}

export function getNauczyciel(id: number): Promise<Nauczyciel> {
	return axios.get(`http://localhost:3001/classrooms/${id}`).then((response) => {
		return new Nauczyciel(
			parseInt(response.data.id),
			response.data.imie,
			response.data.nazwisko,
			response.data.wyksztalcenie,
			response.data.email
		);
	}) as Promise<Nauczyciel>;
}
export function postNauczyciel(nauczyciel: Nauczyciel) {
	axios.post("http://localhost:3001/grades", nauczyciel.JSONized).then((response) => {
		console.log(response.status, response.data.token);
	});
}

//sale
export function getSale(): Promise<Sala[]> {
	return axios.get("http://localhost:3001/classrooms").then((response) => {
		let salaList: Sala[] = [];
		response.data.forEach((params: any) => {
			let nSala = new Sala(
				parseInt(params.id),
				parseInt(params.pietro),
				parseInt(params.numer),
				parseInt(params.pojemnosc)
			);
			salaList.push(nSala);
		});
		return salaList;
	}) as Promise<Sala[]>;
}

export function getSala(id: number): Promise<Sala> {
	return axios.get(`http://localhost:3001/classrooms/${id}`).then((response) => {
		return new Sala(
			parseInt(response.data.id),
			parseInt(response.data.pietro),
			parseInt(response.data.numer),
			parseInt(response.data.pojemnosc)
		);
	}) as Promise<Sala>;
}

export function postSala(sala: Sala) {
	axios.post("http://localhost:3001/grades", sala.JSONized).then((response) => {
		console.log(response.status, response.data.token);
	});
}

//Lekcja
export function getLekcje(): Promise<Lekcja[]> {
	return axios.get("http://localhost:3001/lessons?_embed=classroom&_embed=teacher&_embed=grade").then((response) => {
		let LekcjaList: Lekcja[] = [];
		response.data.forEach((params: any) => {
			let nLekcja = new Lekcja(
				params.id,
				params.nazwa_przedmiotu,
				params.nr_lekcji,
				params.dzien,
				new Klasa(
					parseInt(params.grade.id),
					parseInt(params.grade.rok),
					params.grade.grupa,
					parseInt(params.grade.liczba_uczniow),
					parseInt(params.grade.teacherId),
					params.grade.profil
				),
				new Nauczyciel(
					parseInt(params.teacher.id),
					params.teacher.imie,
					params.teacher.nazwisko,
					params.teacher.wyksztalcenie,
					params.teacher.email
				),
				new Sala(
					parseInt(params.classroom.id),
					parseInt(params.classroom.pietro),
					parseInt(params.classroom.numer),
					parseInt(params.classroom.pojemnosc)
				),
				params.typZajec
			);
			LekcjaList.push(nLekcja);
		});
		return LekcjaList;
	}) as Promise<Lekcja[]>;
}

export function getLekcja(id: number) {
	return axios.get(`http://localhost:3001/lessons/${id}`).then((response) => {
		return new Lekcja(
			response.data.id,
			response.data.nazwa_przedmiotu,
			response.data.nr_lekcji,
			response.data.dzien,
			new Klasa(
				parseInt(response.data.grade.id),
				parseInt(response.data.grade.rok),
				response.data.grade.grupa,
				parseInt(response.data.grade.liczba_uczniow),
				parseInt(response.data.grade.teacherId),
				response.data.grade.profil
			),
			new Nauczyciel(
				parseInt(response.data.teacher.id),
				response.data.teacher.imie,
				response.data.teacher.nazwisko,
				response.data.teacher.wyksztalcenie,
				response.data.teacher.email
			),
			new Sala(
				parseInt(response.data.classroom.id),
				parseInt(response.data.classroom.pietro),
				parseInt(response.data.classroom.numer),
				parseInt(response.data.classroom.pojemnosc)
			),
			response.data.typZajec
		);
	}) as Promise<Sala>;
}

export function postLekcja(lekcja: Lekcja) {
	axios.post("http://localhost:3001/grades", lekcja.JSONized).then((response) => {
		console.log(response.status, response.data.token);
	});
}
