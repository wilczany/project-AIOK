import React, { useEffect, useState } from "react";
import ListaSal from "./lista/ListaSal";
import Sala from "../models/sala";
import { getSale } from "../services/DatabaseService";
import DodajSale from "./dodaj/DodajSale";

function Sale(): React.ReactNode {
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
		<>
			<ListaSal saleList={saleList} />
			<DodajSale appendSaleList={appendSaleList} />
		</>
	);
}

export default Sale;
