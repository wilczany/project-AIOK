import React, { useEffect, useState } from "react";
import { getSale } from "../services/DatabaseService";
import Sala from "../models/sala";
import DodajSale from "./DodajSale";

function ListaSal(): React.ReactNode {
	const [saleList, setSaleList] = useState<any[]>([]);

	useEffect(() => {
		let salePromise: Promise<Sala[]> = getSale();
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
		<div style={{ backgroundColor: "magenta" }} className="row">
			<p>Komponent ListaSal</p>
			<div className="column lista">
				<h3>Lista sal:</h3>
				<table>
					<thead>
						<tr>
							<th>Sala</th>
						</tr>
					</thead>
					<tbody>
						{saleList.map((sala) => {
							return (
								<tr>
									<td>{sala.Pn}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<div className="column dodawanie">
				<DodajSale></DodajSale>
			</div>
		</div>
	);
}

export default ListaSal;
