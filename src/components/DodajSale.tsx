import React from "react";
import Sala from "../models/sala";
import { postSala } from "../services/DatabaseService";

interface IProps {
	saleList: Sala[];
	appendSaleList(sala: Sala): void;
}

const DodajSale = (props: IProps) => {
	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		const target = e.target as typeof e.target & {
			pietro: { value: number };
			numer: { value: number };
			pojemnosc: { value: number };
		};

		let s: Sala = new Sala(0, target.pietro.value, target.numer.value, target.pojemnosc.value);

		props.appendSaleList(s);
		postSala(s);
	}

	return (
		<form method="post" onSubmit={handleSubmit}>
			<label>
				Piętro: <input name="pietro" type="number" min="0" max="3" required />
			</label>
			<br />

			<label>
				Numer: <input name="numer" type="number" min="1" max="99" required />
			</label>
			<br />

			<label>
				Pojemność: <input name="pojemnosc" type="number" min="10" max="32" required />
			</label>
			<br />

			<button type="reset">Reset form</button>
			<button type="submit">Submit form</button>
		</form>
	);
};

export default DodajSale;
