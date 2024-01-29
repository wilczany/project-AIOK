import React, { useEffect, useState } from "react";
import Sala from "../../models/sala";
import { classroomTaken, getNextId, postSala } from "../../services/DatabaseService";
import ValidationInfo from "../ValidationInfo";
import ValidationInfoHidden from "../ValidationInfoHidden";

interface IProps {
	appendSaleList(sala: Sala): void;
}

const DodajSale = (props: IProps) => {
	const [nextId, setNextId] = useState<number>(0);
	const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
	const [pietroM1Cyfra, setPietroM1Cyfra] = useState<boolean>(false);
	const [pietroMin0, setPietroMin0] = useState<boolean>(false);
	const [pietroMax3, setPietroMax3] = useState<boolean>(false);
	const [numerM2Liczba, setNumerM2Liczba] = useState<boolean>(false);
	const [numerMin1, setNumerMin1] = useState<boolean>(false);
	const [numerMax99, setNumerMax99] = useState<boolean>(false);
	const [pojemnosc2Liczba, setPojemnosc2Liczba] = useState<boolean>(false);
	const [pojemnoscMin10, setPojemnoscMin10] = useState<boolean>(false);
	const [pojemnoscMax32, setPojemnoscMax32] = useState<boolean>(false);
	const [pnZajete, setPnZajete] = useState<boolean>(false);

	useEffect(() => {
		getNextId("classrooms").then((response) => setNextId(response));
	}, []);

	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		setButtonsDisabled(true);

		validatePietro();
		validateNumer();
		validatePojemnosc();
		if (
			pietroM1Cyfra &&
			pietroMax3 &&
			pietroMin0 &&
			numerM2Liczba &&
			numerMax99 &&
			numerMin1 &&
			pojemnosc2Liczba &&
			pojemnoscMax32 &&
			pojemnoscMin10
		) {
			const target = e.target as typeof e.target & {
				pietro: { value: number };
				numer: { value: number };
				pojemnosc: { value: number };
			};

			if (nextId > 0) {
				let s: Sala = new Sala(nextId, target.pietro.value, target.numer.value, target.pojemnosc.value);
				setPnZajete(false);

				classroomTaken(s).then((res) => {
					if (!res) {
						props.appendSaleList(s);
						postSala(s).then((res) => {
							getNextId("classrooms").then((response) => setNextId(response));
							setButtonsDisabled(false);
						});
					} else {
						setPnZajete(true);
						setButtonsDisabled(false);
					}
				});
			}
		} else {
			setButtonsDisabled(false);
		}
	}

	function validatePietro(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("pietro") as HTMLInputElement;
		}
		if (el.value) {
			if (el.value.length > 1) {
				setPietroM1Cyfra(false);
				setPietroMin0(false);
				setPietroMax3(false);
				return;
			}

			let numValue = parseInt(el.value);
			if (Number.isNaN(numValue)) {
				setPietroM1Cyfra(false);
				setPietroMin0(false);
				setPietroMax3(false);
				return;
			}
			setPietroM1Cyfra(true);

			if (numValue < 0) {
				setPietroMin0(false);
			} else {
				setPietroMin0(true);
			}

			if (numValue > 3) {
				setPietroMax3(false);
			} else {
				setPietroMax3(true);
			}
		} else {
			setPietroM1Cyfra(false);
			setPietroMin0(false);
			setPietroMax3(false);
		}
	}

	function validateNumer(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("numer") as HTMLInputElement;
		}
		if (el.value) {
			let numValue = parseInt(el.value);
			if (Number.isNaN(numValue)) {
				setNumerM2Liczba(false);
				setNumerMin1(false);
				setNumerMax99(false);
				return;
			}
			if (el.value.length > 2) {
				setNumerM2Liczba(false);
			} else {
				setNumerM2Liczba(true);
			}

			if (numValue < 1) {
				setNumerMin1(false);
			} else {
				setNumerMin1(true);
			}

			if (numValue > 99) {
				setNumerMax99(false);
			} else {
				setNumerMax99(true);
			}
		} else {
			setNumerM2Liczba(false);
			setNumerMin1(false);
			setNumerMax99(false);
		}
	}

	function validatePojemnosc(e?: React.SyntheticEvent) {
		let el: HTMLInputElement;
		if (e) {
			el = e.target as HTMLInputElement;
		} else {
			el = document.getElementById("pojemnosc") as HTMLInputElement;
		}
		if (el.value) {
			let numValue = parseInt(el.value);
			if (Number.isNaN(numValue)) {
				setPojemnosc2Liczba(false);
				setPojemnoscMax32(false);
				setPojemnoscMin10(false);
				return;
			}

			if (Math.abs(numValue) < 100 && Math.abs(numValue) > 9) {
				setPojemnosc2Liczba(true);
			} else {
				setPojemnosc2Liczba(false);
			}

			if (numValue < 10) {
				setPojemnoscMin10(false);
			} else {
				setPojemnoscMin10(true);
			}

			if (numValue > 32) {
				setPojemnoscMax32(false);
			} else {
				setPojemnoscMax32(true);
			}
		} else {
			setPojemnosc2Liczba(false);
			setPojemnoscMin10(false);
			setPojemnoscMax32(false);
		}
	}

	return (
		<form method="post" onSubmit={handleSubmit}>
			{/* min="0" max="3" required */}
			<label>
				Piętro:{" "}
				<input id="pietro" onFocus={validatePietro} onChange={validatePietro} name="pietro" type="number" />
				<ValidationInfo status={pietroM1Cyfra} text="Piętro musi być pojedynczą cyfrą." />
				<ValidationInfo status={pietroMin0} text="Minimalne piętro to 0." />
				<ValidationInfo status={pietroMax3} text="Maksymalne piętro to 3." />
			</label>
			<br />

			{/* min="1" max="99" required */}
			<label>
				Numer: <input id="numer" onFocus={validateNumer} onChange={validateNumer} name="numer" type="number" />
				<ValidationInfo status={numerM2Liczba} text="Numer musi być maksymalnie dwucyfrową liczbą." />
				<ValidationInfo status={numerMin1} text="Minimalny numer to 1." />
				<ValidationInfo status={numerMax99} text="Maksymalny numer to 99." />
			</label>
			<br />

			{/* min="10" max="32" required */}
			<label>
				Pojemność:{" "}
				<input
					id="pojemnosc"
					onFocus={validatePojemnosc}
					onChange={validatePojemnosc}
					name="pojemnosc"
					type="number"
				/>
				<ValidationInfo status={pojemnosc2Liczba} text="Pojemność musi być dwucyfrową liczbą." />
				<ValidationInfo status={pojemnoscMin10} text="Minimalna pojemność to 10." />
				<ValidationInfo status={pojemnoscMax32} text="Maksymalna pojemność to 32." />
			</label>
			<br />

			<button type="reset" disabled={buttonsDisabled}>
				Reset
			</button>
			<button type="submit" disabled={buttonsDisabled}>
				Submit
			</button>
			<ValidationInfoHidden status={pnZajete} text={`Podana kombinacja piętra i numeru sali jest już zajęta.`} />
		</form>
	);
};

export default DodajSale;
