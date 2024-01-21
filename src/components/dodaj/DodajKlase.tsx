import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Klasa from "../../models/klasa";
import { getNauczyciele, postKlasa } from "../../services/DatabaseService";
import Nauczyciel from "../../models/nauczyciel";

interface IProps {
	klasyList: Klasa[];
	appendKlasyList(klasa: Klasa): void;
}

const DodajKlase = (props: IProps) => {
	const [wychowacy, setWychowawcy] = useState<any[]>([]);

	useEffect(() => {
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

		const target = e.target as typeof e.target & {
			rok: { value: number };
			grupa: { value: string };
			liczba_uczniow: { value: number };
			idWychowawcy: { value: number };
			profil: { value: string };
		};

		let k: Klasa = new Klasa(
			0,
			Number(target.rok.value),
			target.grupa.value,
			Number(target.liczba_uczniow.value),
			Number(target.idWychowawcy.value),
			target.profil.value
		);

		console.log(k);
		props.appendKlasyList(k);
		postKlasa(k);
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

			<button type="reset">Reset form</button>
			<button type="submit">Submit form</button>
		</form>
	);
};

export default DodajKlase;
