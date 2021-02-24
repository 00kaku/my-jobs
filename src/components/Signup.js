import React, { useState } from "react";
import Banner from "./Banner";
import { Link, Redirect } from "react-router-dom";
import "./Signup.css";
import axios from "../axios";
const Signup = () => {
	const [isError, setIsError] = useState(false);
	const [isEmailError, setIsEMailError] = useState(false);
	const [isRecruiterSelected, setIsRecruiterSelected] = useState(true);
	const [isPasswordError, setIsPasswordError] = useState(false);
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [skills, SetSkills] = useState("");
	const [userRole, setUserRole] = useState(0);
	const [user, setUser] = useState(localStorage.getItem("user"));
	const [isEmailUsed, setIsEmailUsed] = useState(false);
	const handleSignup = (e) => {
		e.preventDefault();

		if (!email || !password || !passwordConfirm || !fullName || !skills) {
			setIsError(true);
		} else if (password !== passwordConfirm) {
			setIsError(true);
			setIsPasswordError(true);
		} else {
			axios
				.post("auth/register", {
					email: email,
					name: fullName,
					password: password,
					confirmPassword: passwordConfirm,
					skills: skills,
					userRole: userRole,
				})
				.then((response) => {
					setRedirect(true);
					return response;
				})
				.catch((error) => {
					if (
						error.response.data.message ==
						"You are already registered."
					) {
						setIsEmailUsed(true);
						setIsError(false);
					} else {
						setIsEmailUsed(false);
						setIsError(true);
					}
				});
		}
	};

	if (redirect) {
		return <Redirect to="/login" />;
	}

	if (user) {
		return <Redirect to="/jobs" />;
	}
	return (
		<div className="signup">
			<Banner />
			<div className="form__box">
				<h2>Signup</h2>
				<p>I am a *</p>
				<div className="radio">
					<div
						className={isRecruiterSelected ? "inverse" : ""}
						onClick={() => {
							setUserRole(0);
							setIsRecruiterSelected(true);
						}}
					>
						<h4>
							<span className="fa fa-user fa-large"></span>
							Recruiter
						</h4>
					</div>
					<div
						className={!isRecruiterSelected ? "inverse" : ""}
						onClick={() => {
							setUserRole(1);
							setIsRecruiterSelected(false);
						}}
					>
						<h4>
							<span className="fa fa-user-plus "></span>
							Candidate
						</h4>
					</div>
				</div>
				<form className="signup__form">
					<label htmlFor="Full Name">Full Name*</label>
					<input
						type="text"
						name="full name"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						placeholder="Can't have special characters or number..."
						required
					/>

					{!isError ? null : (
						<div className="form_error">
							This field is mandatory and can't have number and
							special characters
						</div>
					)}

					<label htmlFor="email">Email address*</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter the email..."
						required
					/>

					{!isError ? null : (
						<div className="form_error">
							{isEmailError
								? "Invalid Email."
								: "This field is mandatory."}
						</div>
					)}

					{!isEmailUsed ? null : (
						<div className="form_warning">
							This email is already registered.
						</div>
					)}
					<label htmlFor="password_create">Create Password*</label>
					<input
						type="password"
						name="password_create"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password should be greatet than 6 characters long..."
						required
					/>

					<label htmlFor="password_confirm">Confirm Password*</label>
					<input
						type="password"
						name="password_confirm"
						value={passwordConfirm}
						onChange={(e) => setPasswordConfirm(e.target.value)}
						placeholder="Confirm the password..."
						required
					/>

					{!isError ? null : (
						<div className="form_error">
							{isPasswordError
								? `Passwords don't match`
								: `This field is mandatory and must have more than 6 characters.`}
						</div>
					)}

					<label htmlFor="skills">Skills*</label>
					<input
						type="text"
						name="skills"
						value={skills}
						onChange={(e) => SetSkills(e.target.value)}
						placeholder="Must be greater than 3 characters..."
						required
					/>
					{!isError ? null : (
						<div className="form_error">
							This field is mandatory and must have more than 3
							characters.
						</div>
					)}

					<button onClick={handleSignup}>Signup</button>
				</form>

				<h4>
					Already have an acount?
					<span className="login__create text-link">
						<Link to="/login"> Login</Link>
					</span>
				</h4>
			</div>
		</div>
	);
};

export default Signup;
