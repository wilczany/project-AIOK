import React, { useEffect, useState } from "react";
import { getKlasy } from "../services/DatabaseService";
import Klasa from "../models/klasa";
import DodajKlase from "./DodajKlase";

function ListaKlas(): React.ReactNode {
	const [klasyList, setKlasyList] = useState<any[]>([]);

	useEffect(() => {
		let klasyPromise: Promise<Klasa[]> = getKlasy();
		console.log(klasyPromise);
		klasyPromise.then((klasy) =>
			klasy.forEach((klasa) => {
				let klasaObject: Klasa = Klasa.copyFactory(klasa);
				console.log(klasaObject);
				setKlasyList((klasyList) => [...klasyList, klasaObject]);
			})
		);
		// console.log(klasyList);
	}, []);

	return (
		<div style={{ backgroundColor: "yellow" }} className="row">
			<p>Komponent ListaKlas</p>
			<div className="column lista">
				<h3>Lista klas:</h3>
				<table>
					<thead>
						<tr>
							<th>Id klasy</th>
						</tr>
					</thead>
					<tbody>
						{klasyList.map((klasa) => {
							return (
								<tr>
									<td>{klasa.Rg}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<div className="column dodawanie">
				<DodajKlase></DodajKlase>
			</div>
		</div>
	);
}

export default ListaKlas;
