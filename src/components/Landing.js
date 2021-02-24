import { useState } from "react";
import "./Landing.css";
import LandingImage from "../assets/landing.jpg";
import Info from "./Info";
import { infoCollection, ImageCollection } from "./Infotext";
import Banner from "./Banner";
import { Link, Redirect } from "react-router-dom";
const Landing = () => {
	let loginButton = (
		<Link to="/login">
			<button className="landing__button">Login/Signup</button>
		</Link>
	);
	const [user, setUser] = useState(localStorage.getItem("user"));

	if (user) {
		return <Redirect to="/jobs" />;
	}
	return (
		<div className="landing">
			<Banner bannerHeading_button={loginButton}>
				<div className="landing__bannerContents">
					<div className="landing__bannerTextContent">
						<h1 className="landing__bannerText">
							Welcome to
							<br />
							<b>
								My
								<span className="landing__headerTitle">
									Jobs
								</span>
							</b>
						</h1>
						<Link to="/signup">
							<button>Get Started</button>
						</Link>
					</div>

					<div className="landing__bannerImage">
						<img src={LandingImage} />
					</div>
				</div>
			</Banner>

			<div className="landing__info">
				<h2>Why Us</h2>
				<div className="landing__infoBox">
					{infoCollection.map((info) => {
						return (
							<Info
								key={info.title}
								title={info.title}
								desc={info.desc}
							/>
						);
					})}
				</div>
			</div>

			<div className="landing__testimonials">
				<h3>Companies who trusts us</h3>
				<div className="landing__testiCompanies">
					{ImageCollection.map((image) => {
						return (
							<img
								src={image}
								key={image.slice(image.length - 20)}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Landing;
