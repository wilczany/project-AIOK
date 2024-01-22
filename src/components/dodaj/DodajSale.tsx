import React, { useEffect, useState } from "react";
import Sala from "../../models/sala";
import { getNextId, postSala } from "../../services/DatabaseService";

interface IProps {
	saleList: Sala[];
	appendSaleList(sala: Sala): void;
}

const DodajSale = (props: IProps) => {
	const [nextId, setNextId] = useState<number>(0);
	const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);

	useEffect(() => {
		getNextId("classrooms")
			.then((response) => setNextId(response))
			.finally(() => console.log(nextId));
	}, []);

	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		setButtonsDisabled(true);

		// console.log(nextId);
		const target = e.target as typeof e.target & {
			pietro: { value: number };
			numer: { value: number };
			pojemnosc: { value: number };
		};

		if (nextId > 0) {
			let s: Sala = new Sala(nextId, target.pietro.value, target.numer.value, target.pojemnosc.value);

			props.appendSaleList(s);
			postSala(s).then((res) => {
				getNextId("classrooms").then((response) => setNextId(response));
				setButtonsDisabled(false);
			});
		}
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

			<button type="reset" disabled={buttonsDisabled}>
				Reset form
			</button>
			<button type="submit" disabled={buttonsDisabled}>
				Submit form
			</button>
		</form>
	);
};

export default DodajSale;
