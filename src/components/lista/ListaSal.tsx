import React, { useEffect, useState } from "react";
import { getSale } from "../../services/DatabaseService";
import Sala from "../../models/sala";
import DodajSale from "../dodaj/DodajSale";

function ListaSal(): React.ReactNode {
	const [saleList, setSaleList] = useState<any[]>([]);
	const [listLoaded, setListLoaded] = useState<boolean>(false);

	function appendSaleList(sala: Sala) {
		setSaleList((saleList) => [...saleList, sala]);
	}

	useEffect(() => {
		if (!listLoaded) {
			let salePromise: Promise<Sala[]> = getSale();
			salePromise.then((sale) =>
				sale.forEach((sala) => {
					let salaObject: Sala = Sala.copyFactory(sala);
					appendSaleList(salaObject);
				})
			);
			setListLoaded(true);
		}
	}, [saleList]);

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
								<tr key={sala.Id.toString() + sala.Pn}>
									{/* co do klucza odsyłam do pliku ListaKlas */}
									<td>{sala.Pn}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<div className="column dodawanie">
				<DodajSale saleList={saleList} appendSaleList={appendSaleList}></DodajSale>
			</div>
		</div>
	);
}

export default ListaSal;
