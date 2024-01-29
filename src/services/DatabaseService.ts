import axios from "axios";
import Klasa from "../models/klasa";
import Nauczyciel from "../models/nauczyciel";
import Sala from "../models/sala";
import Lekcja from "../models/lekcja";

//klasy
export function getKlasy(): Promise<Klasa[]> {
	return axios.get("http://localhost:3001/grades?_sort=rok,grupa").then((response) => {
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
	return axios.get(`http://localhost:3001/grades/${id}`).then((response) => {
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

export function gradeTaken(klasa: Klasa): Promise<boolean> {
	// let kl: Klasa = Klasa.copyFactory(klasa); //kocham typescript:)
	return axios.get(`http://localhost:3001/grades?grupa=${klasa.grupa}&rok=${klasa.rok}`).then((response) => {
		if (response.data.length > 0) return true;
		return false;
	});
}

export function postKlasa(klasa: Klasa) {
	let k: Klasa = Klasa.copyFactory(klasa);
	return axios.post("http://localhost:3001/grades", k.JSONized).then((response) => {
		//TODO zwracanie response zamiast logów, obsługa w komponentach
		console.log(response);
	});
}

export function deleteKlasa(id: number) {
	return axios.delete(`http://localhost:3001/grades/${id}`).then((response) => {
		//TODO zwracanie response zamiast logów, obsługa w komponentach
		console.log(response);
	});
}

export function putKlasa(klasa: Klasa) {
	return axios.put(`http://localhost:3001/grades/${klasa.Id}`, klasa.JSONized).then((response) => {
		//TODO zwracanie response zamiast logów, obsługa w komponentach
		console.log(response);
	});
}

//nauczyciele
export function getNauczyciele(): Promise<Nauczyciel[]> {
	return axios.get("http://localhost:3001/teachers?_sort=nazwisko,imie").then((response) => {
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

export function emailTaken(nauczyciel: Nauczyciel): Promise<boolean> {
	let n: Nauczyciel = Nauczyciel.copyFactory(nauczyciel);
	return axios.get(`http://localhost:3001/teachers?email=${n.Email}`).then((response) => {
		if (response.data.length > 0) return true;
		return false;
	});
}

export function getNauczyciel(id: number): Promise<Nauczyciel> {
	return axios.get(`http://localhost:3001/teachers/${id}`).then((response) => {
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
	let n: Nauczyciel = Nauczyciel.copyFactory(nauczyciel);
	return axios.post("http://localhost:3001/teachers", n.JSONized).then((response) => {
		//TODO zwracanie response zamiast logów, obsługa w komponentach
		console.log(response.status, response.data.token);
	});
}

export function deleteNauczyciel(id: number) {
	return axios.delete(`http://localhost:3001/teachers/${id}`).then((response) => {
		//TODO zwracanie response zamiast logów, obsługa w komponentach
		console.log(response);
	});
}

export function putNauczyciel(nauczyciel: Nauczyciel) {
	return axios.put(`http://localhost:3001/teachers/${nauczyciel.Id}`, nauczyciel.JSONized).then((response) => {
		//TODO zwracanie response zamiast logów, obsługa w komponentach
		console.log(response);
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
	return axios.post("http://localhost:3001/classrooms", sala.JSONized).then((response) => {
		//TODO zwracanie response zamiast logów, obsługa w komponentach
		console.log(response.status, response.data.token);
	});
}

export function deleteSala(id: number) {
	return axios.delete(`http://localhost:3001/classrooms/${id}`).then((response) => {
		//TODO zwracanie response zamiast logów, obsługa w komponentach
		console.log(response);
	});
}

export function putSala(sala: Sala) {
	return axios.put(`http://localhost:3001/classrooms/${sala.Id}`, sala.JSONized).then((response) => {
		//TODO zwracanie response zamiast logów, obsługa w komponentach
		console.log(response);
	});
}

export function classroomTaken(sala: Sala): Promise<boolean> {
	// let s: Sala = Sala.copyFactory(sala);
	return axios.get(`http://localhost:3001/classrooms?pietro=${sala.pietro}&numer=${sala.numer}`).then((response) => {
		if (response.data.length > 0) return true;
		return false;
	});
}

//Lekcja
export function getLekcje(): Promise<Lekcja[]> {
	return axios.get("http://localhost:3001/lessons?_embed=classroom&_embed=teacher&_embed=grade").then((response) => {
		let LekcjaList: Lekcja[] = [];
		response.data.forEach((params: any) => {
			let nLekcja = new Lekcja(
				parseInt(params.id),
				params.nazwa,
				parseInt(params.nr_lekcji),
				params.dzienTygodnia,
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

export function getLekcja(id: number): Promise<Lekcja> {
	return axios
		.get(`http://localhost:3001/lessons/${id}?_embed=grade&_embed=teacher&_embed=classroom`)
		.then((response) => {
			const l: Lekcja = new Lekcja(
				response.data.id,
				response.data.nazwa,
				response.data.nr_lekcji,
				response.data.dzienTygodnia,
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
			return l;
		}) as Promise<Lekcja>;
}

export function lessonTaken(lekcja: Lekcja): Promise<boolean> {
	// let l: Lekcja = Lekcja.copyFactory(lekcja);
	// let s: Sala = Sala.copyFactory(l.Sala);
	return axios
		.get(
			`http://localhost:3001/lessons?nr_lekcji=${lekcja.nr_lekcji}&dzienTygodnia=${lekcja.dzien}&classroomId=${lekcja.sala.id}`
		)
		.then((res) => {
			console.log("penis", res);
			if (res.data.length == 0) return true;
			return false;
		});
}

export function postLekcja(lekcja: Lekcja) {
	let l: Lekcja = Lekcja.copyFactory(lekcja);
	console.log(l);
	console.log(l.JSONized);
	console.log(lekcja.Klasa);
	let jsonized: any = lekcja.JSONized;
	console.log(jsonized);
	return axios.post("http://localhost:3001/lessons", jsonized).then((response) => {
		//TODO zwracanie response zamiast logów, obsługa w komponentach
		console.log(response.status, response.data.token);
	});
}

export function deleteLekcja(id: number) {
	return axios.delete(`http://localhost:3001/lessons/${id}`).then((response) => {
		//TODO zwracanie response zamiast logów, obsługa w komponentach
		console.log(response);
	});
}

export function putLekcja(lekcja: Lekcja) {
	return axios.put(`http://localhost:3001/lessons/${lekcja.Id}`, lekcja.JSONized).then((response) => {
		//TODO zwracanie response zamiast logów, obsługa w komponentach
		console.log(response);
	});
}

export function getNextId(typ: string) {
	//dozwolone typy: grades, lessons, classrooms, teachers
	//zmienić na enuma
	return axios.get(`http://localhost:3001/${typ}`).then((response) => {
		return Math.max.apply(
			Math,
			response.data.map(function (o: any) {
				return Number(o.id) + 1;
			})
		);
	});
}
