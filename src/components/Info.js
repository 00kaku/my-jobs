import React from "react";
import "./Info.css";

const Info = ({ title, desc }) => {
	return (
		<div className="info__card">
			<h3 className="info__title">{title}</h3>
			<p className="info__desc">{desc}</p>
		</div>
	);
};

export default Info;
