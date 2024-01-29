import React, { SyntheticEvent, useEffect, useReducer, useState } from "react";
import { deleteKlasa, getKlasy } from "../../services/DatabaseService";
import Klasa from "../../models/klasa";
import DodajKlase from "../dodaj/DodajKlase";

interface IProps {
	klasyList: Klasa[];
	objectOnClick?: (event: SyntheticEvent) => void;
	controlButtons?: boolean;
}

const ListaKlas = (props: IProps) => {
	return (
		<>
			<div className="column lista">
				<table>
					<thead>
						<tr>
							<th>Klasy</th>
						</tr>
					</thead>
					<tbody>
						{props.klasyList
							.sort((a, b) => a.Rg.localeCompare(b.Rg))
							.map((klasa) => {
								return (
									<tr key={klasa.Id.toString() + klasa.Rg}>
										{/* po walidacji formularzy nawet samo Id będzie unikalnym kluczem tbh, ale teraz przynajmniej grupuje to co tak samo się ma wyświetlać mimo takich samych id */}
										{/* dla zainteresowanych https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js */}
										<td data-klasa={JSON.stringify(klasa)} onClick={props.objectOnClick}>
											{klasa.Rg}
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
			</div>
		</>
	);
};

export default ListaKlas;
