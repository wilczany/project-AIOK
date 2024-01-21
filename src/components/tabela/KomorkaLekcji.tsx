import React from "react";
import Zajecia from "../../models/lekcja";

//prosty przykład jak typować propsy z kochanym typescriptem
interface Props {
	lesson: Zajecia;
}

// komponent odpowiedzialny za wypełnienie komórki w tabeli danymi o lekcji
// używalny w tabeli lekcji klasy, nauczyciela oraz sali, bo przyjmuje jedynie lekcję do sformatowania oraz wypisania w krótkim formacie
// komponent prezentacyjny 1/2; komponent reużywalny 1/4
function KomorkaLekcji({ lesson }: Props): React.ReactNode {
	return (
		<span>
			{lesson.Nazwa} {lesson.Sala.Pn} {lesson.Nauczyciel.ShortName}
		</span>
	);
}

export default KomorkaLekcji;
