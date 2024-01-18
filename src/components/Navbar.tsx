import React from "react";
import { Link } from "react-router-dom";

function Navbar(): React.ReactNode {
	return (
		<div>
			<Link to="/lista-klas">Lista klas</Link>
			<Link to="/lista-nauczycieli">Lista nauczycieli</Link>
			<Link to="/lista-sal">Lista sal</Link>
		</div>
	);
}

export default Navbar;
