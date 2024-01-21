import React from "react";
import { Link } from "react-router-dom";

function Navbar(): React.ReactNode {
	return (
		<div>
			<Link to="/lista-klas">
				<button>Lista klas</button>
			</Link>
			<Link to="/lista-nauczycieli">
				<button>Lista nauczycieli</button>
			</Link>
			<Link to="/lista-sal">
				<button>Lista sal</button>
			</Link>
		</div>
	);
}

export default Navbar;
