import React, { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from "react";
import Klasa from "../../models/klasa";
import {
	classroomTaken,
	emailTaken,
	getNextId,
	gradeTaken,
	lessonTaken,
	postLekcja,
} from "../../services/DatabaseService";
import Nauczyciel from "../../models/nauczyciel";
import Lekcja from "../../models/lekcja";
import Sala from "../../models/sala";
import DniTygodnia from "../../models/dniTygodnia";
import TypyLekcji from "../../models/typyLekcji";
import ValidationInfo from "../ValidationInfo";
import ValidationInfoHidden from "../ValidationInfoHidden";

interface IProps {
	klasyList: Klasa[];
	nauczycieleList: Nauczyciel[];
	saleList: Sala[];
	lekcjeList: Lekcja[];
	appendLekcjeList(lekcja: Lekcja): void;
	setSelectedKlasa: Dispatch<SetStateAction<Klasa | null>>; //chyba?
	setSelectedNauczyciel: Dispatch<SetStateAction<Nauczyciel | null>>; //chyba?
	setSelectedSala: Dispatch<SetStateAction<Sala | null>>; //chyba?
}

const DodajLekcje = (props: IProps) => {
	const [nextId, setNextId] = useState<number>(0);
	const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
	const [nazwaMin3, setNazwaMin3] = useState<boolean>(false);
	const [nazwaMax20, setNazwaMax20] = useState<boolean>(false);
	const [nrM2Liczba, setNrM2Liczba] = useState<boolean>(false);
	const [nrMin1, setNrMin1] = useState<boolean>(false);
	const [nrMax14, setNrMax14] = useState<boolean>(false);
	const [dzienEnum, setDzienEnum] = useState<boolean>(false);
	const [klasaIstnieje, setKlasaIstnieje] = useState<boolean>(false);
	const [nauczycielIstnieje, setNauczycielIstnieje] = useState<boolean>(false);
	const [salaIstnieje, setSalaIstnieje] = useState<boolean>(false);
	const [salaZajeta, setSalaZajeta] = useState<boolean>(false);
	const [typEnum, setTypEnum] = useState<boolean>(false);

	useEffect(() => {
		getNextId("lessons").then((response) => setNextId(response));
	}, []);

	function validateNazwa(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("nazwa") as HTMLInputElement;
		}

		if (el.value) {
			if (el.value.length < 3) {
				setNazwaMin3(false);
			} else {
				setNazwaMin3(true);
			}

			if (el.value.length > 20) {
				setNazwaMax20(false);
			} else {
				setNazwaMax20(true);
			}
		} else {
			setNazwaMin3(false);
			setNazwaMax20(false);
		}
	}

	function validateNumer(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("nr_lekcji") as HTMLInputElement;
		}
		if (el.value) {
			let numValue = parseInt(el.value);
			if (Number.isNaN(numValue)) {
				setNrM2Liczba(false);
				setNrMin1(false);
				setNrMax14(false);
				return;
			}
			if (el.value.length > 2) {
				setNrM2Liczba(false);
			} else {
				setNrM2Liczba(true);
			}

			if (numValue < 1) {
				setNrMin1(false);
			} else {
				setNrMin1(true);
			}

			if (numValue > 14) {
				setNrMax14(false);
			} else {
				setNrMax14(true);
			}
		} else {
			setNrM2Liczba(false);
			setNrMin1(false);
			setNrMax14(false);
		}
	}

	function validateDzien(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("dzien") as HTMLInputElement;
		}
		if (el.value) {
			setDzienEnum(false);
			Object.keys(DniTygodnia).forEach((dzien) => {
				if (el.value == dzien) {
					setDzienEnum(true);
					return;
				}
			});
		} else {
			setDzienEnum(false);
		}
	}

	function validateTyp(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("typ") as HTMLInputElement;
		}
		if (el.value) {
			setTypEnum(false);
			Object.keys(TypyLekcji).forEach((typ) => {
				if (el.value == typ) {
					setTypEnum(true);
					return;
				}
			});
		} else {
			setTypEnum(false);
		}
	}

	function validateKlasa(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("klasa") as HTMLInputElement;
		}
		if (el.value) {
			gradeTaken(JSON.parse(el.value)).then((res) => {
				if (res) {
					setKlasaIstnieje(true);
				} else {
					setKlasaIstnieje(false);
				}
			});
		} else {
			setKlasaIstnieje(false);
		}
	}

	function validateNauczyciel(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("nauczyciel") as HTMLInputElement;
		}
		if (el.value) {
			emailTaken(JSON.parse(el.value)).then((res) => {
				if (res) {
					setNauczycielIstnieje(true);
				} else {
					setNauczycielIstnieje(false);
				}
			});
		} else {
			setNauczycielIstnieje(false);
		}
	}

	function validateSala(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("sala") as HTMLInputElement;
		}
		if (el.value) {
			classroomTaken(JSON.parse(el.value)).then((res) => {
				if (res) {
					setSalaIstnieje(true);
				} else {
					setSalaIstnieje(false);
				}
			});
		} else {
			setSalaIstnieje(false);
		}
	}

	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		setButtonsDisabled(true);

		validateDzien();
		validateKlasa();
		validateNazwa();
		validateNumer();
		validateTyp();
		validateNauczyciel();
		validateSala();
		setSalaZajeta(false);

		if (
			nazwaMax20 &&
			nazwaMin3 &&
			nrM2Liczba &&
			nrMin1 &&
			nrMax14 &&
			dzienEnum &&
			klasaIstnieje &&
			nauczycielIstnieje &&
			salaIstnieje &&
			typEnum
		) {
			const target = e.target as typeof e.target & {
				nazwa: { value: string };
				nr_lekcji: { value: string };
				dzien: { value: DniTygodnia };
				klasa: { value: string };
				nauczyciel: { value: string };
				sala: { value: string };
				typ: { value: TypyLekcji };
			};

			if (nextId > 0) {
				let l: Lekcja = new Lekcja(
					nextId,
					target.nazwa.value,
					parseInt(target.nr_lekcji.value),
					target.dzien.value,
					JSON.parse(target.klasa.value),
					JSON.parse(target.nauczyciel.value),
					JSON.parse(target.sala.value),
					target.typ.value
				);

				lessonTaken(l).then((notTaken) => {
					if (notTaken) {
						setSalaZajeta(true);
						props.appendLekcjeList(l);
						postLekcja(l).then((res) => {
							getNextId("lessons").then((newId) => setNextId(newId));
							setButtonsDisabled(false);
						});
					} else {
						setSalaZajeta(true);
						setButtonsDisabled(false);
					}
				});
			}
		} else {
			setButtonsDisabled(false);
		}
	}

	function onKlasaSelect(event: SyntheticEvent<HTMLSelectElement, Event>): void {
		validateKlasa();
		let element = event.target as HTMLSelectElement;
		let kl: Klasa = JSON.parse(element.value);
		console.log(kl);
		props.setSelectedKlasa(kl);
		console.log(kl);
	}

	function onNauczycielSelect(event: SyntheticEvent<HTMLSelectElement, Event>): void {
		validateNauczyciel();
		let element = event.target as HTMLSelectElement;
		let n: Nauczyciel = JSON.parse(element.value);
		props.setSelectedNauczyciel(n);
	}

	function onSalaSelect(event: SyntheticEvent<HTMLSelectElement, Event>): void {
		validateSala();
		let element = event.target as HTMLSelectElement;
		let s: Sala = JSON.parse(element.value);
		props.setSelectedSala(s);
	}

	return (
		<form method="post" onSubmit={handleSubmit}>
			<label>
				Nazwa przedmiotu:{" "}
				<input id="nazwa" onFocus={validateNazwa} onChange={validateNazwa} name="nazwa" type="string" />
				<ValidationInfo status={nazwaMin3} text="Nazwa musi zawierać przynajmniej 3 znaki." />
				<ValidationInfo status={nazwaMax20} text="Nazwa może zawierać maksymalnie 20 znaków." />
			</label>
			<br />

			<label>
				Numer lekcji:{" "}
				<input id="nr_lekcji" onFocus={validateNumer} onChange={validateNumer} name="nr_lekcji" type="number" />
				<ValidationInfo status={nrM2Liczba} text="Numer zajęć musi być maksymalnie dwucyfrową liczbą." />
				<ValidationInfo status={nrMin1} text="Minimalny numer zajęć to 1." />
				<ValidationInfo status={nrMax14} text="Maksymalny numer zajęć to 14." />
			</label>
			<br />

			<label>
				Dzień:{" "}
				<select id="dzien" onFocus={validateDzien} onChange={validateDzien} name="dzien">
					<option value="pon">Poniedziałek</option>
					<option value="wt">Wtorek</option>
					<option value="sr">Środa</option>
					<option value="czw">Czwartek</option>
					<option value="pt">Piątek</option>
				</select>
				<ValidationInfo
					status={dzienEnum}
					text="Wybrana wartość musi być jednym z pierwszych pięciu dni tygodnia."
				/>
			</label>
			<br />

			<label>
				Klasa:{" "}
				<select id="klasa" name="klasa" onFocus={onKlasaSelect} onChange={onKlasaSelect}>
					{props.klasyList.map((klasa) => {
						return (
							<option key={klasa.Id.toString() + klasa.Rg} value={JSON.stringify(klasa)}>
								{/* co do klucza odsyłam do pliku ListaKlas */}
								{klasa.Rg}
							</option>
						);
					})}
				</select>
				<ValidationInfo status={klasaIstnieje} text="Wybrana klasa musi istnieć w bazie danych." />
			</label>
			<br />

			<label>
				Nauczyciel:{" "}
				<select id="nauczyciel" name="nauczyciel" onFocus={onNauczycielSelect} onChange={onNauczycielSelect}>
					{props.nauczycieleList.map((nauczyciel) => {
						return (
							<option
								key={nauczyciel.Id.toString() + nauczyciel.FullName}
								value={JSON.stringify(nauczyciel)}
							>
								{/* co do klucza odsyłam do pliku ListaKlas */}
								{nauczyciel.FullName}
							</option>
						);
					})}
				</select>
				<ValidationInfo status={nauczycielIstnieje} text="Wybrany nauczyciel musi istnieć w bazie danych." />
			</label>
			<br />

			<label>
				Sala:{" "}
				<select id="sala" name="sala" onFocus={onSalaSelect} onChange={onSalaSelect}>
					{props.saleList.map((sala) => {
						return (
							<option key={sala.Id.toString() + sala.Pn} value={JSON.stringify(sala)}>
								{/* co do klucza odsyłam do pliku ListaKlas */}
								{sala.Pn}
							</option>
						);
					})}
				</select>
				<ValidationInfo status={salaIstnieje} text="Wybrana sala musi istnieć w bazie danych." />
			</label>
			<br />

			<label>
				Typ zajęć:{" "}
				<select id="typ" onFocus={validateTyp} onChange={validateTyp} name="typ">
					<option value={"zaj"}>Zajęcia</option>
					<option value={"kon"}>Konsultacje</option>
				</select>
				<ValidationInfo status={typEnum} text="Wartość musi być zajęciami lub konsultacjami." />
			</label>
			<br />

			<button type="reset" disabled={buttonsDisabled}>
				Reset
			</button>
			<button type="submit" disabled={buttonsDisabled}>
				Submit
			</button>
			<ValidationInfoHidden status={salaZajeta} text={`Wybrana sala w podanych godzinach jest zajęta`} />
		</form>
	);
};

export default DodajLekcje;
