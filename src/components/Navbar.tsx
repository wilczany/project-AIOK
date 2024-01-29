import "../stylesheets/navbar.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar(): React.ReactNode {
	const navigate = useNavigate();
	return (
		<div className="navbar">
			<br />
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
