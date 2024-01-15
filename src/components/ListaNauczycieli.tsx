import React, { useEffect, useState } from "react";
import { getFetchNauczyciele } from "../services/DatabaseService";
import Nauczyciel from "../models/nauczyciel";

function ListaNauczycieli(): React.ReactNode {
	const [nauczycieleList, setNauczycieleList] = useState<any[]>([]);

	useEffect(() => {
		let nauczycielePromise: Promise<Nauczyciel[]> = getFetchNauczyciele();
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
		<div style={{ backgroundColor: "magenta" }}>
			<p>Komponent lista nauczycieli</p>
			{nauczycieleList.map((nauczyciel) => {
				return (
					<p>
						{nauczyciel.FullName}, email {nauczyciel.Email}
					</p>
				);
			})}
		</div>
	);
}

export default ListaNauczycieli;
