import "./stylesheets/app.css";
import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Rozklady from "./components/tabela/Rozklady";
import Navbar from "./components/Navbar";
import Klasy from "./components/Klasy";
import Nauczyciele from "./components/Nauczyciele";
import Sale from "./components/Sale";
import KreatorLekcji from "./components/KreatorLekcji";
import OpisLekcji from "./components/OpisLekcji";
//kuniec debugowych

function App() {
	return (
		<BrowserRouter>
			<div className="navbar">
				<Navbar></Navbar>
			</div>
			<div className="App">
				<Routes>
					<Route path="/" Component={Klasy} />
					<Route path="/lista-klas" Component={Klasy} />
					<Route path="/lista-nauczycieli" Component={Nauczyciele} />
					<Route path="/lista-sal" Component={Sale} />
					<Route path="/rozklady" Component={Rozklady} />
					<Route path="/kreator-lekcji" Component={KreatorLekcji} />
					<Route path="/lekcje/:id" element={<OpisLekcji />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
