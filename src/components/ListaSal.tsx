import React, { useEffect, useState } from "react";
import { getFetchSale } from "../services/DatabaseService";
import Sala from "../models/sala";

function ListaSal(): React.ReactNode {
	const [saleList, setSaleList] = useState<any[]>([]);

	useEffect(() => {
		let salePromise: Promise<Sala[]> = getFetchSale();
		// console.log(salePromise);
		salePromise.then((sale) =>
			sale.forEach((sala) => {
				let salaObject: Sala = Sala.copyFactory(sala);
				console.log(salaObject);
				setSaleList((saleList) => [...saleList, salaObject]);
			})
		);
		// console.log(klasyList);
	}, []);

	return (
		<div style={{ backgroundColor: "brown" }}>
			<p>Komponent lista sal</p>
			{saleList.map((sala) => {
				return (
					<p>
						Piętro {sala.pietro}, pokój numer {sala.numer}
					</p>
				);
			})}
		</div>
	);
}

export default ListaSal;
