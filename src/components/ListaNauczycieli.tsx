import React, { useEffect, useState } from "react";
import { getNauczyciele } from "../services/DatabaseService";
import Nauczyciel from "../models/nauczyciel";
import DodajNauczyciela from "./DodajNauczyciela";

function ListaNauczycieli(): React.ReactNode {
	const [nauczycieleList, setNauczycieleList] = useState<any[]>([]);

	useEffect(() => {
		let nauczycielePromise: Promise<Nauczyciel[]> = getNauczyciele();
		console.log(nauczycielePromise);
		nauczycielePromise.then((nauczyciele) =>
			nauczyciele.forEach((nauczyciel) => {
				let nauczycielObject: Nauczyciel = Nauczyciel.copyFactory(nauczyciel);
				console.log(nauczycielObject);
				setNauczycieleList((nauczycieleList) => [...nauczycieleList, nauczycielObject]);
			})
		);
		// console.log(klasyList);
	}, []);

	return (
		<div style={{ backgroundColor: "cyan" }} className="row">
			<p>Komponent ListaNauczycieli</p>
			<div className="column lista">
				<h3>Lista nauczycieli:</h3>
				<table>
					<thead>
						<tr>
							<th>Imię i nazwisko</th>
						</tr>
					</thead>
					<tbody>
						{nauczycieleList.map((nauczyciel) => {
							return (
								<tr>
									<td>{nauczyciel.FullName}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<div className="column dodawanie">
				<DodajNauczyciela></DodajNauczyciela>
			</div>
		</div>
	);
}

export default ListaNauczycieli;
