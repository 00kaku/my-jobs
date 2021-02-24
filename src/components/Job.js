import React from "react";
import "./Job.css";
const Job = ({ job, button }) => {
	return (
		<div className="job">
			<div className="job__title">
				<h2>{job.title}</h2>
			</div>
			<div className="job__desc">
				<p>{job.description}</p>
			</div>

			<div className="job__footer">
				<p>
					<span className="fa fa-map-marker"></span>
					{job.location}
				</p>
				{button}
			</div>
		</div>
	);
};

export default Job;
