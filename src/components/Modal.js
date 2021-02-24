import React from "react";
import "./Modal.css";
const Modal = (props) => {
	return (
		<div className="modal">
			<div className="modal__heading">
				<h1>Applicants for this job</h1>
				<h1>
					<span className="fa fa-close" onClick={props.close}></span>
				</h1>
			</div>

			<div className="modal__box">
				{props.persons.map((person) => {
					return (
						<div className="person" key={person.id}>
							<div className="details">
								<span>
									{person.name.substr(0, 1).toUpperCase()}
								</span>

								<div>
									<h2>{person.name}</h2>

									<p>{person.email}</p>
								</div>
							</div>

							<div className="skills">
								<h3>Skills</h3>
								<p>{person.skills}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Modal;
