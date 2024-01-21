import React from "react";
import Nauczyciel from "../models/nauczyciel";
import { postNauczyciel } from "../services/DatabaseService";

interface IProps {
	nauczycieleList: Nauczyciel[];
	appendNauczycieleList(nauczyciel: Nauczyciel): void;
}

const DodajNauczyciela = (props: IProps) => {
	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		const target = e.target as typeof e.target & {
			imie: { value: string };
			nazwisko: { value: string };
			wyksztalcenie: { value: string };
			email: { value: string };
		};

		let n: Nauczyciel = new Nauczyciel(
			0,
			target.imie.value,
			target.nazwisko.value,
			target.wyksztalcenie.value,
			target.email.value
		);

		props.appendNauczycieleList(n);
		postNauczyciel(n);
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

			<button type="reset">Reset form</button>
			<button type="submit">Submit form</button>
		</form>
	);
};

export default DodajNauczyciela;
