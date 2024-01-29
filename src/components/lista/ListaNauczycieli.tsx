import React, { SyntheticEvent, useEffect, useState } from "react";
import { getNauczyciele } from "../../services/DatabaseService";
import Nauczyciel from "../../models/nauczyciel";
import DodajNauczyciela from "../dodaj/DodajNauczyciela";

interface IProps {
	nauczycieleList: Nauczyciel[];
	objectOnClick?: (event: SyntheticEvent) => void;
}

const ListaNauczycieli = (props: IProps) => {
	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Imię i nazwisko</th>
					</tr>
				</thead>
				<tbody>
					{props.nauczycieleList
						.sort((a, b) => a.FullName.localeCompare(b.FullName))
						.map((nauczyciel) => {
							return (
								<tr key={nauczyciel.Id.toString() + nauczyciel.FullName}>
									{/* co do klucza odsyłam do pliku ListaKlas */}
									<td data-nauczyciel={JSON.stringify(nauczyciel)} onClick={props.objectOnClick}>
										{nauczyciel.FullName}
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
};

export default ListaNauczycieli;
