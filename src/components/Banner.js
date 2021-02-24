import React from "react";
import "./Banner.css";
import Navbar from "./Navbar";
const Banner = (props) => {
	return (
		<div className="banner">
			<div className="banner__header">
				<Navbar navbar_button={props.bannerHeading_button} />
			</div>
			{props.children}
		</div>
	);
};

export default Banner;
