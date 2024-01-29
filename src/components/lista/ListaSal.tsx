import React, { SyntheticEvent, useEffect, useState } from "react";
import { getSale } from "../../services/DatabaseService";
import Sala from "../../models/sala";
import DodajSale from "../dodaj/DodajSale";

interface IProps {
	saleList: Sala[];
	objectOnClick?: (event: SyntheticEvent) => void;
	controlButtons?: boolean;
}

const ListaSal = (props: IProps) => {
	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Sala</th>
					</tr>
				</thead>
				<tbody>
					{props.saleList
						.sort((a, b) => a.Pn.localeCompare(b.Pn))
						.map((sala) => {
							return (
								<tr key={sala.Id.toString() + sala.Pn}>
									{/* co do klucza odsyłam do pliku ListaKlas */}
									<td data-sala={JSON.stringify(sala)} onClick={props.objectOnClick}>
										{sala.Pn}
										{props.controlButtons && (
											<>
												<button onClick={props.objectOnClick}>USUŃ</button>
											</>
										)}
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
};

export default ListaSal;
