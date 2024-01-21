import React, { useEffect, useReducer, useState } from "react";
import { getKlasy } from "../../services/DatabaseService";
import Klasa from "../../models/klasa";
import DodajKlase from "../dodaj/DodajKlase";

const useForceRender = () => {
	const [, forceRender] = useReducer((x) => !x, true);
	return forceRender;
};

function ListaKlas(): React.ReactNode {
	const [klasyList, setKlasyList] = useState<any[]>([]);
	const [listLoaded, setListLoaded] = useState<boolean>(false);
	const forceRender = useForceRender();

	function appendKlasyList(klasa: Klasa) {
		setKlasyList((klasyList) =>
			[...klasyList, klasa].sort((a, b) => {
				return b.Rg - a.Rg;
			})
		);
		console.log(klasyList);
	}

	useEffect(() => {
		if (!listLoaded) {
			let klasyPromise: Promise<Klasa[]> = getKlasy();
			console.log(klasyPromise);
			klasyPromise.then((klasy) =>
				klasy.forEach((klasa) => {
					let klasaObject: Klasa = Klasa.copyFactory(klasa);
					appendKlasyList(klasaObject);
				})
			);
			setListLoaded(true);
			forceRender();
		}
	}, [klasyList]);

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
								<tr key={klasa.Id.toString() + klasa.Rg}>
									{/* po walidacji formularzy nawet samo Id będzie unikalnym kluczem tbh, ale teraz przynajmniej grupuje to co tak samo się ma wyświetlać mimo takich samych id */}
									{/* dla zainteresowanych https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js */}
									<td>{klasa.Rg}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<div className="column dodawanie">
				<DodajKlase klasyList={klasyList} appendKlasyList={appendKlasyList}></DodajKlase>
			</div>
		</div>
	);
}

export default ListaKlas;
