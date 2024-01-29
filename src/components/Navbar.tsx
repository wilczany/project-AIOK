import "../stylesheets/navbar.css";
import React from "react";
import { Link } from "react-router-dom";

function Navbar(): React.ReactNode {
	return (
		<div className="navbar">
			<Link to="/lista-klas">
				<button>Lista klas</button>
			</Link>
			<Link to="/lista-nauczycieli">
				<button>Lista nauczycieli</button>
			</Link>
			<Link to="/lista-sal">
				<button>Lista sal</button>
			</Link>
			<Link to="/rozklady">
				<button>Rozkłady</button>
			</Link>
			<Link to="/kreator-lekcji">
				<button>Kreator lekcji</button>
			</Link>
		</div>
	);
}

export default Navbar;
