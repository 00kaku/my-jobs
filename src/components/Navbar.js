import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
	return (
		<div className="navbar__header">
			<h1>
				<Link to="/">
					My<span className="navbar__headerTitle">Jobs</span>
				</Link>
			</h1>
			{props.navbar_button}
		</div>
	);
};

export default Navbar;
