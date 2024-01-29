import React, { useEffect, useState } from "react";
import Lekcja from "../../models/lekcja";
import DniTygodnia from "../../models/dniTygodnia";
import KomorkaLekcji from "./KomorkaLekcji";
import "../../stylesheets/rozklad.css";

interface IProps {
	lekcjeList: Lekcja[];
}

// komponent zwracający tabelę z rozkładem zajęć z podanymi godzinami oraz dniami wypełnioną na podstawie podanej listy
const Rozklad = (props: IProps) => {
	return (
		<>
			<table>
				<thead>
					<tr>
						<th>L.p.</th> <th>Godziny</th> <th>Poniedziałek</th> <th>Wtorek</th> <th>Środa</th>
						<th>Czwartek</th> <th>Piątek</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						{/* wszystkie "błędy" działają prawidłowo, wpierw porównywane było z pełnymi nazwami dni i nie działało, później bezpośrednio z enumami np. DniTygodnia.pon, co też nie działało */}
						<td>1</td> <td>8.30 - 9.15</td>
						<td id="1 pon">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien === "pon" && lekcja.NrLekcji == 1
								)}
							/>
						</td>
						<td id="1 wt">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "wt" && lekcja.NrLekcji == 1)}
							/>
						</td>
						<td id="1 Środa">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "sr" && lekcja.NrLekcji == 1)}
							/>
						</td>
						<td id="1 Czwartek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "czw" && lekcja.NrLekcji == 1
								)}
							/>
						</td>
						<td id="1 Piątek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "pt" && lekcja.NrLekcji == 1)}
							/>
						</td>
					</tr>
					<tr>
						<td>2</td> <td>9.15 - 10.00</td>
						<td id="2 pon">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pon" && lekcja.NrLekcji == 2
								)}
							/>
						</td>
						<td id="2 wt">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "wt" && lekcja.NrLekcji == 2)}
							/>
						</td>
						<td id="2 Środa">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "sr" && lekcja.NrLekcji == 2)}
							/>
						</td>
						<td id="2 Czwartek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "czw" && lekcja.NrLekcji == 2
								)}
							/>
						</td>
						<td id="2 Piątek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "pt" && lekcja.NrLekcji == 2)}
							/>
						</td>
					</tr>
					<tr>
						<td>3</td> <td>10.15 - 11.00</td>
						<td id="3 pon">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pon" && lekcja.NrLekcji == 3
								)}
							/>
						</td>
						<td id="3 wt">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "wt" && lekcja.NrLekcji == 3)}
							/>
						</td>
						<td id="3 Środa">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "sr" && lekcja.NrLekcji == 3)}
							/>
						</td>
						<td id="3 Czwartek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "czw" && lekcja.NrLekcji == 3
								)}
							/>
						</td>
						<td id="3 Piątek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "pt" && lekcja.NrLekcji == 3)}
							/>
						</td>
					</tr>
					<tr>
						<td>4</td> <td>11.00 - 11.45</td>
						<td id="4 pon">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pon" && lekcja.NrLekcji == 4
								)}
							/>
						</td>
						<td id="4 wt">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "wt" && lekcja.NrLekcji == 4)}
							/>
						</td>
						<td id="4 Środa">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "sr" && lekcja.NrLekcji == 4)}
							/>
						</td>
						<td id="4 Czwartek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "czw" && lekcja.NrLekcji == 4
								)}
							/>
						</td>
						<td id="4 Piątek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "pt" && lekcja.NrLekcji == 4)}
							/>
						</td>
					</tr>
					<tr>
						<td>5</td> <td>12.00 - 12.45</td>
						<td id="5 pon">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pon" && lekcja.NrLekcji == 5
								)}
							/>
						</td>
						<td id="5 wt">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "wt" && lekcja.NrLekcji == 5)}
							/>
						</td>
						<td id="5 Środa">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "sr" && lekcja.NrLekcji == 5)}
							/>
						</td>
						<td id="5 Czwartek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "czw" && lekcja.NrLekcji == 5
								)}
							/>
						</td>
						<td id="5 Piątek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "pt" && lekcja.NrLekcji == 5)}
							/>
						</td>
					</tr>
					<tr>
						<td>6</td> <td>12.45 - 13.30</td>
						<td id="6 pon">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pon" && lekcja.NrLekcji == 6
								)}
							/>
						</td>
						<td id="6 wt">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "wt" && lekcja.NrLekcji == 6)}
							/>
						</td>
						<td id="6 Środa">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "sr" && lekcja.NrLekcji == 6)}
							/>
						</td>
						<td id="6 Czwartek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "czw" && lekcja.NrLekcji == 6
								)}
							/>
						</td>
						<td id="6 Piątek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "pt" && lekcja.NrLekcji == 6)}
							/>
						</td>
					</tr>
					<tr>
						<td>7</td> <td>14:00 - 14.45</td>
						<td id="7 pon">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pon" && lekcja.NrLekcji == 7
								)}
							/>
						</td>
						<td id="7 wt">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "wt" && lekcja.NrLekcji == 7)}
							/>
						</td>
						<td id="7 Środa">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "sr" && lekcja.NrLekcji == 7)}
							/>
						</td>
						<td id="7 Czwartek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "czw" && lekcja.NrLekcji == 7
								)}
							/>
						</td>
						<td id="7 Piątek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "pt" && lekcja.NrLekcji == 7)}
							/>
						</td>
					</tr>
					<tr>
						<td>8</td> <td>14.45 - 15.30</td>
						<td id="8 pon">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pon" && lekcja.NrLekcji == 8
								)}
							/>
						</td>
						<td id="8 wt">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "wt" && lekcja.NrLekcji == 8)}
							/>
						</td>
						<td id="8 Środa">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "sr" && lekcja.NrLekcji == 8)}
							/>
						</td>
						<td id="8 Czwartek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "czw" && lekcja.NrLekcji == 8
								)}
							/>
						</td>
						<td id="8 Piątek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "pt" && lekcja.NrLekcji == 8)}
							/>
						</td>
					</tr>
					<tr>
						<td>9</td> <td>16:00 - 16.45</td>
						<td id="9 pon">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pon" && lekcja.NrLekcji == 9
								)}
							/>
						</td>
						<td id="9 wt">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "wt" && lekcja.NrLekcji == 9)}
							/>
						</td>
						<td id="9 Środa">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "sr" && lekcja.NrLekcji == 9)}
							/>
						</td>
						<td id="9 Czwartek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "czw" && lekcja.NrLekcji == 9
								)}
							/>
						</td>
						<td id="9 Piątek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find((lekcja) => lekcja.Dzien == "pt" && lekcja.NrLekcji == 9)}
							/>
						</td>
					</tr>
					<tr>
						<td>10</td> <td>16.45 - 17.30</td>
						<td id="10 pon">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pon" && lekcja.NrLekcji == 10
								)}
							/>
						</td>
						<td id="10 wt">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "wt" && lekcja.NrLekcji == 10
								)}
							/>
						</td>
						<td id="10 Środa">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "sr" && lekcja.NrLekcji == 10
								)}
							/>
						</td>
						<td id="10 Czwartek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "czw" && lekcja.NrLekcji == 10
								)}
							/>
						</td>
						<td id="10 Piątek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pt" && lekcja.NrLekcji == 10
								)}
							/>
						</td>
					</tr>
					<tr>
						<td>11</td> <td>17.40 - 18.25</td>
						<td id="11 pon">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pon" && lekcja.NrLekcji == 11
								)}
							/>
						</td>
						<td id="11 wt">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "wt" && lekcja.NrLekcji == 11
								)}
							/>
						</td>
						<td id="11 Środa">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "sr" && lekcja.NrLekcji == 11
								)}
							/>
						</td>
						<td id="11 Czwartek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "czw" && lekcja.NrLekcji == 11
								)}
							/>
						</td>
						<td id="11 Piątek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pt" && lekcja.NrLekcji == 11
								)}
							/>
						</td>
					</tr>
					<tr>
						<td>12</td> <td>18.25 - 19.10</td>
						<td id="12 pon">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pon" && lekcja.NrLekcji == 12
								)}
							/>
						</td>
						<td id="12 wt">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "wt" && lekcja.NrLekcji == 12
								)}
							/>
						</td>
						<td id="12 Środa">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "sr" && lekcja.NrLekcji == 12
								)}
							/>
						</td>
						<td id="12 Czwartek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "czw" && lekcja.NrLekcji == 12
								)}
							/>
						</td>
						<td id="12 Piątek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pt" && lekcja.NrLekcji == 12
								)}
							/>
						</td>
					</tr>
					<tr>
						<td>13</td> <td>19.20 - 20.05</td>
						<td id="13 pon">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pon" && lekcja.NrLekcji == 13
								)}
							/>
						</td>
						<td id="13 wt">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "wt" && lekcja.NrLekcji == 13
								)}
							/>
						</td>
						<td id="13 Środa">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "sr" && lekcja.NrLekcji == 13
								)}
							/>
						</td>
						<td id="13 Czwartek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "czw" && lekcja.NrLekcji == 13
								)}
							/>
						</td>
						<td id="13 Piątek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pt" && lekcja.NrLekcji == 13
								)}
							/>
						</td>
					</tr>
					<tr>
						<td>14</td> <td>20.05 - 20.50</td>
						<td id="14 pon">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pon" && lekcja.NrLekcji == 14
								)}
							/>
						</td>
						<td id="14 wt">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "wt" && lekcja.NrLekcji == 14
								)}
							/>
						</td>
						<td id="14 Środa">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "sr" && lekcja.NrLekcji == 14
								)}
							/>
						</td>
						<td id="14 Czwartek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "czw" && lekcja.NrLekcji == 14
								)}
							/>
						</td>
						<td id="14 Piątek">
							<KomorkaLekcji
								lesson={props.lekcjeList.find(
									(lekcja) => lekcja.Dzien == "pt" && lekcja.NrLekcji == 14
								)}
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default Rozklad;
