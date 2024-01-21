import "./App.css";
import { Component, ReactNode, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

//do debuga tylko
import Piaskownica from "./components/debug/Piaskownica";
import ListaKlas from "./components/lista/ListaKlas";
import ListaNauczycieli from "./components/lista/ListaNauczycieli";
import ListaSal from "./components/lista/ListaSal";
import Navbar from "./components/Navbar";
//kuniec debugowych

function App() {
	return (
		<Router>
			<div className="navbar">
				<Navbar></Navbar>
			</div>
			<div className="App">
				<Routes>
					<Route path="/" Component={ListaKlas} />
					<Route path="/lista-klas" Component={ListaKlas} />
					<Route path="/lista-nauczycieli" Component={ListaNauczycieli} />
					<Route path="/lista-sal" Component={ListaSal} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
