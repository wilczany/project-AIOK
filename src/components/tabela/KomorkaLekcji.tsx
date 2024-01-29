import React from "react";
import Lekcja from "../../models/lekcja";
import { Link } from "react-router-dom";

//prosty przykład jak typować propsy z kochanym typescriptem
interface IProps {
	lesson?: Lekcja;
}

// komponent odpowiedzialny za wypełnienie komórki w tabeli danymi o lekcji
// używalny w tabeli lekcji klasy, nauczyciela oraz sali, bo przyjmuje jedynie lekcję do sformatowania oraz wypisania w krótkim formacie
// komponent prezentacyjny 1/2; komponent reużywalny 1/4
function KomorkaLekcji({ lesson }: IProps): React.ReactNode {
	if (typeof lesson != "undefined") {
		return (
			<Link to={"/lekcje/" + lesson?.Id}>
				{lesson?.Nazwa} {lesson?.Sala.Pn} {lesson?.Nauczyciel.ShortName}
			</Link>
		);
	} else {
		return <></>;
	}
}

export default KomorkaLekcji;
