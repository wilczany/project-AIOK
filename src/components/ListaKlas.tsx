import React, { useEffect, useState } from "react";
import { getFetchKlasy } from "../services/DatabaseService";
import Klasa from "../models/klasa";

function ListaKlas(): React.ReactNode {
	const [klasyList, setKlasyList] = useState<any[]>([]);

	useEffect(() => {
		let klasyPromise: Promise<Klasa[]> = getFetchKlasy();
		klasyPromise.then((klasy) =>
			klasy.forEach((klasa) => {
				let klasaObject: Klasa = Klasa.copyFactory(klasa);
				console.log(klasaObject);
				setKlasyList((klasyList) => [...klasyList, klasaObject]);
			})
		);
		console.log(klasyList);
	}, []);

	return (
		<div>
			{klasyList.map((klasa) => {
				return (
					<p>
						{klasa.Id}, liczba uczniów {klasa.liczba_uczniow}
					</p>
				);
			})}
		</div>
	);
}

export default ListaKlas;
