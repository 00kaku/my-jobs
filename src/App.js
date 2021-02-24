import { useState } from "react";
import "./App.css";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgetPassword from "./components/ForgetPassword";
import Jobs from "./containers/Jobs";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
function App() {
	return (
		<Router>
			<div className="app">
				<Route exact path="/">
					<Landing />
				</Route>

				<Route path="/login" component={Login} />
				<Route path="/Signup" component={Signup} />
				<Route path="/ForgetPassword" component={ForgetPassword} />

				<Route path="/jobs" component={Jobs} />
			</div>
		</Router>
	);
}

export default App;
