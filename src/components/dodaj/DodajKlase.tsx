import React, { useEffect, useState } from "react";
import Klasa from "../../models/klasa";
import { getNauczyciele, getNextId, postKlasa } from "../../services/DatabaseService";
import Nauczyciel from "../../models/nauczyciel";

interface IProps {
	klasyList: Klasa[];
	appendKlasyList(klasa: Klasa): void;
}

const DodajKlase = (props: IProps) => {
	const [nextId, setNextId] = useState<number>(0);
	const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
	const [wychowacy, setWychowawcy] = useState<any[]>([]);

	useEffect(() => {
		getNextId("grades")
			.then((response) => setNextId(response))
			.finally(() => console.log(nextId));

		let nauczycielePromise: Promise<Nauczyciel[]> = getNauczyciele();
		console.log(nauczycielePromise);
		nauczycielePromise.then((nauczyciele) =>
			nauczyciele.forEach((nauczyciel) => {
				let nauczycielObject: Nauczyciel = Nauczyciel.copyFactory(nauczyciel);
				console.log(nauczycielObject);
				setWychowawcy((wychowawcy) => [...wychowawcy, nauczycielObject]);
			})
		);
	}, []);

	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		setButtonsDisabled(true);

		const target = e.target as typeof e.target & {
			rok: { value: number };
			grupa: { value: string };
			liczba_uczniow: { value: number };
			idWychowawcy: { value: number };
			profil: { value: string };
		};

		let k: Klasa = new Klasa(
			nextId,
			Number(target.rok.value),
			target.grupa.value,
			Number(target.liczba_uczniow.value),
			Number(target.idWychowawcy.value),
			target.profil.value
		);

		console.log(k);
		props.appendKlasyList(k);
		postKlasa(k).then((res) => {
			getNextId("grades").then((response) => setNextId(response));
			setButtonsDisabled(false);
		});
	}

	return (
		<form method="post" onSubmit={handleSubmit}>
			<label>
				Rok: <input name="rok" type="number" min="1" max="8" required />
			</label>
			<br />

			<label>
				Grupa: <input name="grupa" type="text" pattern="[A-Z]" required />
			</label>
			<br />

			<label>
				Liczba uczniów: <input name="liczba_uczniow" type="number" min="10" max="32" required />
			</label>
			<br />

			<label>
				Wychowawca:
				<select name="idWychowawcy">
					{wychowacy.map((wychowawca) => {
						return (
							<option key={wychowawca.Id.toString() + wychowawca.FullName} value={wychowawca.Id}>
								{/* co do klucza odsyłam do pliku ListaKlas */}
								{wychowawca.FullName}
							</option>
						);
					})}
				</select>
			</label>
			<br />

			<label>
				Profil: <input name="profil" type="string" maxLength={20} required />
			</label>
			<br />

			<button type="reset" disabled={buttonsDisabled}>
				Reset form
			</button>
			<button type="submit" disabled={buttonsDisabled}>
				Submit form
			</button>
		</form>
	);
};

export default DodajKlase;
