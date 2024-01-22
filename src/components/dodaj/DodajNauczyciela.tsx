import React, { useEffect, useState } from "react";
import Nauczyciel from "../../models/nauczyciel";
import { getNextId, postNauczyciel } from "../../services/DatabaseService";

interface IProps {
	nauczycieleList: Nauczyciel[];
	appendNauczycieleList(nauczyciel: Nauczyciel): void;
}

const DodajNauczyciela = (props: IProps) => {
	const [nextId, setNextId] = useState<number>(0);
	const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);

	useEffect(() => {
		getNextId("teachers")
			.then((response) => setNextId(response))
			.finally(() => console.log(nextId));
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

		let n: Nauczyciel = new Nauczyciel(
			nextId,
			target.imie.value,
			target.nazwisko.value,
			target.wyksztalcenie.value,
			target.email.value
		);

		props.appendNauczycieleList(n);
		postNauczyciel(n).then((res) => {
			getNextId("teachers").then((response) => setNextId(response));
			setButtonsDisabled(false);
		});
	}

	return (
		<form method="post" onSubmit={handleSubmit}>
			<p>Komponent DodajNauczyciela</p>
			<label>
				Imie: <input name="imie" type="string" min="0" max="3" required />
			</label>
			<br />

			<label>
				Nazwisko: <input name="nazwisko" type="string" min="1" max="99" required />
			</label>
			<br />

			<label>
				Wykształcenie: <input name="wyksztalcenie" type="string" min="10" max="32" required />
			</label>
			<br />

			<label>
				Adres e-mail:
				<input name="email" type="string" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required />
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

export default DodajNauczyciela;
