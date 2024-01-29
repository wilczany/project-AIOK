import React, { useEffect, useState } from "react";
import Klasa from "../../models/klasa";
import { getNauczyciele, getNextId, gradeTaken, postKlasa } from "../../services/DatabaseService";
import Nauczyciel from "../../models/nauczyciel";
import ValidationInfo from "../ValidationInfo";

interface IProps {
	appendKlasyList(klasa: Klasa): void;
}

const DodajKlase = (props: IProps) => {
	const [nextId, setNextId] = useState<number>(0);
	const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
	const [wychowacy, setWychowawcy] = useState<any[]>([]);

	const [rok1Cyfra, setRok1Cyfra] = useState<boolean>(false);
	const [rokMin1, setRokMin1] = useState<boolean>(false);
	const [rokMax8, setRokMax8] = useState<boolean>(false);
	const [grupaAZ, setGrupaAZ] = useState<boolean>(false);
	const [grupa1MinMax, setGrupa1MinMax] = useState<boolean>(false);
	const [lUczMin10, setLUczMin10] = useState<boolean>(false);
	const [lUczMax32, setLUczMax32] = useState<boolean>(false);
	const [lUcz2Liczba, setLUcz2Liczba] = useState<boolean>(false);
	const [wychowawcaIstnieje, setWychowawcaIstnieje] = useState<boolean>(false);
	const [profilMin3, setProfilMin3] = useState<boolean>(false);
	const [profilMax20, setProfilMax20] = useState<boolean>(false);

	useEffect(() => {
		getNextId("grades").then((response) => setNextId(response));

		let nauczycielePromise: Promise<Nauczyciel[]> = getNauczyciele();
		nauczycielePromise.then((nauczyciele) =>
			nauczyciele.forEach((nauczyciel) => {
				let nauczycielObject: Nauczyciel = Nauczyciel.copyFactory(nauczyciel);
				setWychowawcy((wychowawcy) => [...wychowawcy, nauczycielObject]);
			})
		);
	}, []);

	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		setButtonsDisabled(true);

		validateRok();
		validateGrupa();
		validateLUcz();
		validateProfil();
		validateWychowawca();
		if (
			//useless, sprawdzac po kolei warunki po prostu...
			rok1Cyfra &&
			rokMin1 &&
			rokMax8 &&
			grupa1MinMax &&
			grupaAZ &&
			lUcz2Liczba &&
			lUczMin10 &&
			lUczMax32 &&
			wychowawcaIstnieje &&
			profilMin3 &&
			profilMax20
		) {
			const target = e.target as typeof e.target & {
				rok: { value: number };
				grupa: { value: string };
				liczba_uczniow: { value: number };
				idWychowawcy: { value: number };
				profil: { value: string };
			};

			if (nextId > 0) {
				let k: Klasa = new Klasa(
					nextId,
					Number(target.rok.value),
					target.grupa.value,
					Number(target.liczba_uczniow.value),
					Number(target.idWychowawcy.value),
					target.profil.value
				);

				gradeTaken(k).then((res) => {
					if (!res) {
						props.appendKlasyList(k);
						postKlasa(k).then((res) => {
							getNextId("grades").then((response) => setNextId(response));
							setButtonsDisabled(false);
						});
					} else {
						setButtonsDisabled(false);
					}
				});
			}
		} else {
			setButtonsDisabled(false);
		}
	}

	//TODO oddzielny komponent ValidationInfoErrorOnly dla np. wychowawcy, gdyż jego błąd powinien się wywołać jedynie w przypadku manipulacji kodem
	//TODO? blokowanie przycisków, nie jestem pewien czy wymagane - submit przeprowadza ponowną walidację wszystkiego i na podstawie statusów returnuje
	//TODO unikalny rok+grupa

	function validateRok(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("rok") as HTMLInputElement;
		}
		if (el.value) {
			if (el.value.length > 1) {
				//dwie liczby lub litery oznaczają nie dla każdej walidacji
				setRokMin1(false);
				setRokMax8(false);
				setRok1Cyfra(false);
				return;
			}
			let numValue = parseInt(el.value);
			if (Number.isNaN(numValue)) {
				setRokMin1(false);
				setRokMax8(false);
				setRok1Cyfra(false);
				return;
			}
			setRok1Cyfra(true); //jeżeli parseInt nie jest NaN oraz długość nie jest > 1, to jest to pojedyncza cyfra

			if (numValue < 1) {
				setRokMin1(false);
			} else {
				setRokMin1(true);
			}

			if (numValue > 8) {
				setRokMax8(false);
			} else {
				setRokMax8(true);
			}
		} else {
			setRokMin1(false);
			setRokMax8(false);
			setRok1Cyfra(false);
		}
	}

	function validateGrupa(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("grupa") as HTMLInputElement;
		}
		if (el.value) {
			if (el.value.length > 1 || el.value.length < 1) {
				setGrupa1MinMax(false);
			} else {
				setGrupa1MinMax(true);
			}

			if (/[^A-Za-z]/.test(el.value)) {
				//negacja ze względu na wykluczenie mieszania, np. ;';a4125 by działało bez negowania
				setGrupaAZ(false);
			} else {
				setGrupaAZ(true);
			}
		} else {
			setGrupa1MinMax(false);
			setGrupaAZ(false);
		}
	}

	function validateLUcz(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("lUcz") as HTMLInputElement;
		}
		if (el.value) {
			let numValue = parseInt(el.value);
			if (Number.isNaN(numValue)) {
				setLUcz2Liczba(false);
				setLUczMax32(false);
				setLUczMin10(false);
				return;
			}

			if (Math.abs(numValue) < 100 && Math.abs(numValue) > 9) {
				setLUcz2Liczba(true);
			} else {
				setLUcz2Liczba(false);
			}

			if (numValue < 10) {
				setLUczMin10(false);
			} else {
				setLUczMin10(true);
			}

			if (numValue > 32) {
				setLUczMax32(false);
			} else {
				setLUczMax32(true);
			}
		} else {
			setLUcz2Liczba(false);
			setLUczMin10(false);
			setLUczMax32(false);
		}
	}

	function validateWychowawca(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("wychowawca") as HTMLInputElement;
		}

		if (el.value) {
			let numVal: number = parseInt(el.value);
			if (Number.isNaN(numVal)) {
				setWychowawcaIstnieje(false);
				return;
			}
			wychowacy.forEach((w) => {
				if (w.Id == numVal) {
					setWychowawcaIstnieje(true);
					return;
				}
			});
		} else {
			setWychowawcaIstnieje(false);
		}
	}

	//nie ma konkretnych wymagań dla profilu poza długością
	function validateProfil(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("profil") as HTMLInputElement;
		}

		if (el.value) {
			if (el.value.length < 3) {
				setProfilMin3(false);
			} else {
				setProfilMin3(true);
			}

			if (el.value.length > 20) {
				setProfilMax20(false);
			} else {
				setProfilMax20(true);
			}
		} else {
			setProfilMin3(false);
			setProfilMax20(false);
		}
	}

	return (
		<form method="post" onSubmit={handleSubmit}>
			{/* min="1" max="8" required */}
			<label>
				Rok: <input id="rok" name="rok" type="number" onFocus={validateRok} onChange={validateRok} />
				<br />
				<ValidationInfo status={rok1Cyfra} text="Rok musi być pojedynczą cyfrą." />
				<ValidationInfo status={rokMin1} text="Minimalny rok to 1." />
				<ValidationInfo status={rokMax8} text="Maksymalny rok to 8." />
			</label>

			{/* pattern="[A-Z]" required */}
			<label>
				Grupa: <input id="grupa" name="grupa" onFocus={validateGrupa} onChange={validateGrupa} type="text" />
				<br />
				<ValidationInfo status={grupaAZ} text="Grupa musi być literą ze zbioru od A do Z." />
				<ValidationInfo status={grupa1MinMax} text="Grupa musi być pojedynczym symbolem." />
			</label>

			{/* min="10" max="32" required */}
			<label>
				Liczba uczniów:
				<input id="lUcz" name="liczba_uczniow" onFocus={validateLUcz} onChange={validateLUcz} type="number" />
				<br />
				<ValidationInfo status={lUcz2Liczba} text="Liczba uczniów musi być dwucyfrową liczbą." />
				<ValidationInfo status={lUczMin10} text="Minimalna liczba uczniów w klasie to 10." />
				<ValidationInfo status={lUczMax32} text="Maksymalna liczba uczniów w klasie to 32." />
			</label>

			<label>
				Wychowawca:
				<select
					id="wychowawca"
					name="idWychowawcy"
					onFocus={validateWychowawca}
					onChange={validateWychowawca}
					defaultValue={"DEFAULT"}
				>
					<option value="DEFAULT" disabled>
						Wybierz wychowawcę
					</option>
					{wychowacy.map((wychowawca) => {
						return (
							<option key={wychowawca.Id.toString() + wychowawca.FullName} value={wychowawca.Id}>
								{/* co do klucza odsyłam do pliku ListaKlas */}
								{wychowawca.FullName}
							</option>
						);
					})}
				</select>
				<br />
				<ValidationInfo status={wychowawcaIstnieje} text="Wybrany wychowawca musi istnieć w bazie danych." />
			</label>

			{/* maxLength={20} required  */}
			<label>
				Profil:
				<input id="profil" name="profil" type="string" onFocus={validateProfil} onChange={validateProfil} />
				<br />
				<ValidationInfo status={profilMin3} text="Profil musi zawierać przynajmniej 3 znaki." />
				<ValidationInfo status={profilMax20} text="Profil może zawierać maksymalnie 20 znaków." />
			</label>

			<button type="reset" disabled={buttonsDisabled}>
				Reset
			</button>
			<button type="submit" disabled={buttonsDisabled}>
				Submit
			</button>
		</form>
	);
};

export default DodajKlase;
