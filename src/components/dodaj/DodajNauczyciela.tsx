import React, { useEffect, useState } from "react";
import Nauczyciel from "../../models/nauczyciel";
import { emailTaken, getNextId, postNauczyciel } from "../../services/DatabaseService";
import ValidationInfo from "../ValidationInfo";
import ValidationInfoHidden from "../ValidationInfoHidden";

interface IProps {
	appendNauczycieleList(nauczyciel: Nauczyciel): void;
}

const DodajNauczyciela = (props: IProps) => {
	const [nextId, setNextId] = useState<number>(0);
	const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
	const [imiePierwszaDuza, setImiePierwszaDuza] = useState<boolean>(false);
	const [imieAZaz, setImieAZaz] = useState<boolean>(false);
	const [imieMax20, setImieMax20] = useState<boolean>(false);
	const [imieMin3, setImieMin3] = useState<boolean>(false);
	const [nazwiskoPierwszaDuza, setNazwiskoPierwszaDuza] = useState<boolean>(false);
	const [nazwiskoAZaz, setNazwiskoAZaz] = useState<boolean>(false);
	const [nazwiskoMax20, setNazwiskoMax20] = useState<boolean>(false);
	const [nazwiskoMin3, setNazwiskoMin3] = useState<boolean>(false);
	const [wyksztalcenieAZaz, setWyksztalcenieAZaz] = useState<boolean>(false);
	const [wyksztalcenieMax20, setWyksztalcenieMax20] = useState<boolean>(false);
	const [wyksztalcenieMin3, setWyksztalcenieMin3] = useState<boolean>(false);
	const [emailRegex, setEmailRegex] = useState<boolean>(false);
	const [emailMax40, setEmailMax40] = useState<boolean>(false);
	const [emailMin6, setEmailMin6] = useState<boolean>(false);
	const [emailZajety, setEmailZajety] = useState<boolean>(false);

	useEffect(() => {
		getNextId("teachers").then((response) => setNextId(response));
	}, []);

	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		setButtonsDisabled(true);

		const target = e.target as typeof e.target & {
			imie: { value: string };
			nazwisko: { value: string };
			wyksztalcenie: { value: string };
			email: { value: string };
		};

		if (nextId > 0) {
			let n: Nauczyciel = new Nauczyciel(
				nextId,
				target.imie.value,
				target.nazwisko.value,
				target.wyksztalcenie.value,
				target.email.value
			);

			setEmailZajety(false);
			emailTaken(n).then((res) => {
				if (!res) {
					props.appendNauczycieleList(n);
					postNauczyciel(n).then((res) => {
						getNextId("teachers").then((response) => setNextId(response));
						setButtonsDisabled(false);
					});
				} else {
					setEmailZajety(true);
					setButtonsDisabled(false);
				}
			});
		}
	}

	function validateImie(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("imie") as HTMLInputElement;
		}

		if (el.value) {
			if (/[^A-Z]/.test(el.value.at(0)!)) {
				setImiePierwszaDuza(false);
			} else {
				setImiePierwszaDuza(true);
			}

			if (/[^A-Za-z]/.test(el.value)) {
				setImieAZaz(false);
			} else {
				setImieAZaz(true);
			}

			if (el.value.length < 3) {
				setImieMin3(false);
			} else {
				setImieMin3(true);
			}

			if (el.value.length > 20) {
				setImieMax20(false);
			} else {
				setImieMax20(true);
			}
		} else {
			setImieAZaz(false);
			setImiePierwszaDuza(false);
			setImieMin3(false);
			setImieMax20(false);
		}
	}

	function validateNazwisko(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("nazwisko") as HTMLInputElement;
		}

		if (el.value) {
			if (/[^A-Z]/.test(el.value.at(0)!)) {
				setNazwiskoPierwszaDuza(false);
			} else {
				setNazwiskoPierwszaDuza(true);
			}

			if (/[^A-Za-z]/.test(el.value)) {
				setNazwiskoAZaz(false);
			} else {
				setNazwiskoAZaz(true);
			}

			if (el.value.length < 3) {
				setNazwiskoMin3(false);
			} else {
				setNazwiskoMin3(true);
			}

			if (el.value.length > 20) {
				setNazwiskoMax20(false);
			} else {
				setNazwiskoMax20(true);
			}
		} else {
			setNazwiskoAZaz(false);
			setNazwiskoPierwszaDuza(false);
			setNazwiskoMin3(false);
			setNazwiskoMax20(false);
		}
	}

	function validateWyksztalcenie(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("profil") as HTMLInputElement;
		}

		if (el.value) {
			if (/[^A-Za-z]/.test(el.value)) {
				setWyksztalcenieAZaz(false);
			} else {
				setWyksztalcenieAZaz(true);
			}

			if (el.value.length < 3) {
				setWyksztalcenieMin3(false);
			} else {
				setWyksztalcenieMin3(true);
			}

			if (el.value.length > 20) {
				setWyksztalcenieMax20(false);
			} else {
				setWyksztalcenieMax20(true);
			}
		} else {
			setWyksztalcenieAZaz(false);
			setWyksztalcenieMin3(false);
			setWyksztalcenieMax20(false);
		}
	}

	function validateEmail(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("profil") as HTMLInputElement;
		}

		if (el.value) {
			if (/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(el.value)) {
				setEmailRegex(true);
			} else {
				setEmailRegex(false);
			}

			if (el.value.length < 6) {
				setEmailMin6(false);
			} else {
				setEmailMin6(true);
			}

			if (el.value.length > 40) {
				setEmailMax40(false);
			} else {
				setEmailMax40(true);
			}
		} else {
			setEmailRegex(false);
			setEmailMin6(false);
			setEmailMax40(false);
		}
	}

	return (
		<form method="post" onSubmit={handleSubmit}>
			<label>
				Imie: <input id="imie" onChange={validateImie} onFocus={validateImie} name="imie" type="string" />
				<ValidationInfo status={imieAZaz} text="Imie musi składać się z samych liter." />
				<ValidationInfo status={imiePierwszaDuza} text="Pierwsza litera imienia musi być skapitalizowana." />
				<ValidationInfo status={imieMin3} text="Imie musi zawierać przynajmniej 3 litery." />
				<ValidationInfo status={imieMax20} text="Imie może zawierać maksymalnie 20 liter." />
			</label>
			<br />

			<label>
				Nazwisko:{" "}
				<input
					id="nazwisko"
					onChange={validateNazwisko}
					onFocus={validateNazwisko}
					name="nazwisko"
					type="string"
				/>
				<ValidationInfo status={nazwiskoAZaz} text="Nazwisko musi składać się z samych liter." />
				<ValidationInfo
					status={nazwiskoPierwszaDuza}
					text="Pierwsza litera nazwiska musi być skapitalizowana."
				/>
				<ValidationInfo status={nazwiskoMin3} text="Nazwisko musi zawierać przynajmniej 3 litery." />
				<ValidationInfo status={nazwiskoMax20} text="Nazwisko może zawierać maksymalnie 20 liter." />
			</label>
			<br />

			<label>
				Wykształcenie:{" "}
				<input
					id="wyksztalcenie"
					onChange={validateWyksztalcenie}
					onFocus={validateWyksztalcenie}
					name="wyksztalcenie"
					type="string"
				/>
				<ValidationInfo status={wyksztalcenieAZaz} text="Wykształcenie musi składać się z samych liter." />
				<ValidationInfo status={wyksztalcenieMin3} text="Wykształcenie musi zawierać przynajmniej 3 litery." />
				<ValidationInfo status={wyksztalcenieMax20} text="Wykształcenie może zawierać maksymalnie 20 liter." />
			</label>
			<br />

			{/*  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required */}
			<label>
				Adres e-mail:{" "}
				<input id="email" onChange={validateEmail} onFocus={validateEmail} name="email" type="string" />
				<ValidationInfo
					status={emailRegex}
					text="Adres e-mail musi być w prawidłowym formacie: nazwa@serwis.domena"
				/>
				<ValidationInfo status={emailMin6} text="Adres e-mail musi zawierać przynajmniej 6 znaków." />
				<ValidationInfo status={emailMax40} text="Adres e-mail może zawierać maksymalnie 40 znaków." />
			</label>
			<br />

			<button type="reset" disabled={buttonsDisabled}>
				Reset
			</button>
			<button type="submit" disabled={buttonsDisabled}>
				Submit
			</button>
			<ValidationInfoHidden status={emailZajety} text={`Podany adres e-mail jest już zajęty.`} />
		</form>
	);
};

export default DodajNauczyciela;
