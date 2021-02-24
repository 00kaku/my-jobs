import React, { useState } from "react";
import Banner from "./Banner";
import axios from "../axios";
import { Redirect } from "react-router-dom";
import "./ForgetPassword.css";
const ForgetPassword = () => {
	const [email, setEmail] = useState("");
	const [isError, setIsError] = useState(false);
	const [isEmailError, setIsEmailError] = useState(false);
	const [isEmailForm, setIsEmailForm] = useState(true);
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
	const [isPassError, setIsPassError] = useState(false);
	const [user, setUser] = useState(localStorage.getItem("user"));
	const handleSubmit = (e) => {
		e.preventDefault();

		if (!email) {
			setIsError(true);
			setIsEmailError(false);
		} else {
			axios

				.get(`auth/resetpassword?email=${email}`)
				.then((response) => {
					setIsEmailForm(false);
					console.log(response);
				})
				.catch((error) => {
					setIsEmailError(true);
					setIsError(false);
					console.log(error);
				});
		}
	};

	const emailForm = (
		<div>
			<h1>Forgot password?</h1>
			<h3 className="h3">
				Enter the email associated with your account and we'll send you
				instruction to reset the password.
			</h3>
			<form className="forgot__form">
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
					<div className="form_error">This field is mandatory.</div>
				)}

				{!isEmailError ? null : (
					<div className="form_error">Invalid Email address.</div>
				)}

				<button onClick={handleSubmit}> Submit </button>
			</form>
		</div>
	);

	const passwordForm = (
		<div>
			<h1>Reset Password</h1>
			<p>Enter your new password below.</p>
			<form>
				<label htmlFor="email">New Password*</label>
				<input
					type="password"
					name="newPassword"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					placeholder="Should be gretaer than 6 characters"
					required
				/>

				<label htmlFor="email">Confirm Password*</label>
				<input
					type="password"
					name="newPasswordConfirm"
					value={newPasswordConfirm}
					onChange={(e) => setNewPasswordConfirm(e.target.value)}
					placeholder="Should Match...."
					required
				/>

				{!isPassError ? null : (
					<div className="form_error">This field is mandatory.</div>
				)}

				<button>Reset(Not Working)</button>
			</form>
		</div>
	);

	if (user) {
		return <Redirect to="/jobs" />;
	}
	return (
		<div className="forget">
			<Banner />
			<div className="form__box">
				{isEmailForm ? emailForm : passwordForm}
			</div>
		</div>
	);
};

export default ForgetPassword;
