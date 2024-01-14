import React from "react";
import Zajecia from "../models/zajecia";

//prosty przykład jak typować propsy z kochanym typescriptem
interface Props {
  lesson: Zajecia;
}

// komponent odpowiedzialny za wypełnienie komórki w tabeli danymi o lekcji
// używalny w tabeli lekcji klasy, nauczyciela oraz sali, bo przyjmuje jedynie lekcję do sformatowania oraz wypisania w krótkim formacie
// komponent prezentacyjny 1/2; komponent reużywalny 1/4
function KomorkaZajec({ lesson }: Props): React.ReactNode {
  return (
    <span>
      {lesson.Nazwa} {lesson.Sala.Id} {lesson.Nauczyciel.ShortName}
    </span>
  );
}

export default KomorkaZajec;
