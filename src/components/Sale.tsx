import React, { useEffect, useState } from "react";
import ListaSal from "./lista/ListaSal";
import Sala from "../models/sala";
import { deleteSala, getSale } from "../services/DatabaseService";
import DodajSale from "./dodaj/DodajSale";

function Sale(): React.ReactNode {
	const [saleList, setSaleList] = useState<any[]>([]);
	const [listLoaded, setListLoaded] = useState<boolean>(false);

	function appendSaleList(sala: Sala) {
		setSaleList((saleList) => [...saleList, sala]);
	}

	const objectOnClick = (event: React.SyntheticEvent) => {
		let el = event.target as Element;
		let td = el.parentElement;
		let sala: Sala = JSON.parse(td!.getAttribute("data-sala")!);
		deleteSala(sala.id).then((res) => {
			setListLoaded(false);
			setSaleList([]);
		});
	};

	useEffect(() => {
		document.title = "Sale";
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
			<h1>Sale</h1>
			<ListaSal saleList={saleList} objectOnClick={objectOnClick} controlButtons={true} />
			<DodajSale appendSaleList={appendSaleList} />
		</>
	);
}

export default Sale;
