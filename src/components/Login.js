import React, { useState } from "react";
import Banner from "./Banner";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";
import axios from "../axios";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isError, setIsError] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [user, setUser] = useState(localStorage.getItem("user"));

	const hanldeLogin = (e) => {
		e.preventDefault();
		axios
			.post("auth/login", {
				email: email,
				password: password,
			})
			.then((response) => {
				localStorage.setItem(
					"user",
					JSON.stringify(response.data.data)
				);
				return response;
			})
			.then(() => {
				setRedirect(true);
			})
			.catch((err) => setIsError(true));
	};

	if (redirect) {
		return <Redirect to="/jobs" />;
	}

	if (user) {
		return <Redirect to="/jobs" />;
	}

	return (
		<div className="Login">
			<Banner />
			<div className="form__box">
				<h2>Login</h2>
				<form className="login__form">
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter the email..."
					/>
					<label htmlFor="password" className="login__forget">
						Password
						<span>
							<Link to="/ForgetPassword">Forget password?</Link>
						</span>
					</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter the password..."
					/>
					{!isError ? null : (
						<div className="form_error">
							Incorrect email or password.
						</div>
					)}

					<button onClick={hanldeLogin}>Login </button>
				</form>

				<h4>
					New to MyJobs?
					<span className="login__create text-link">
						<Link to="/signup"> Create an account</Link>
					</span>
				</h4>
			</div>
		</div>
	);
};

export default Login;
