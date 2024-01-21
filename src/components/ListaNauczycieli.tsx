import React, { useEffect, useState } from "react";
import { getNauczyciele } from "../services/DatabaseService";
import Nauczyciel from "../models/nauczyciel";
import DodajNauczyciela from "./DodajNauczyciela";

function ListaNauczycieli(): React.ReactNode {
	const [listLoaded, setListLoaded] = useState<boolean>(false);
	const [nauczycieleList, setNauczycieleList] = useState<any[]>([]);

	function appendNauczycieleList(nauczyciel: Nauczyciel) {
		setNauczycieleList((nauczycieleList) => [...nauczycieleList, nauczyciel]);
	}

	useEffect(() => {
		if (!listLoaded) {
			let nauczycielePromise: Promise<Nauczyciel[]> = getNauczyciele();
			console.log(nauczycielePromise);
			nauczycielePromise.then((nauczyciele) =>
				nauczyciele.forEach((nauczyciel) => {
					let nauczycielObject: Nauczyciel = Nauczyciel.copyFactory(nauczyciel);
					appendNauczycieleList(nauczycielObject);
				})
			);
			setListLoaded(true);
		}
	}, [nauczycieleList]);

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
								<tr key={nauczyciel.Id.toString() + nauczyciel.FullName}>
									{/* co do klucza odsyłam do pliku ListaKlas */}
									<td>{nauczyciel.FullName}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<div className="column dodawanie">
				<DodajNauczyciela
					nauczycieleList={nauczycieleList}
					appendNauczycieleList={appendNauczycieleList}
				></DodajNauczyciela>
			</div>
		</div>
	);
}

export default ListaNauczycieli;
