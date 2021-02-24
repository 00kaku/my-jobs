import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Job from "../components/Job";
import axios from "../axios";
import { Redirect } from "react-router-dom";
import Modal from "../components/Modal";
import "./Jobs.css";
const Jobs = () => {
	const [jobs, setJobs] = useState([]);
	const [isSecondPage, setIsSecondPage] = useState(false);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [redirect, setRedirect] = useState(false);
	const [jobsApplied, setJobsApplied] = useState([]);
	const [isError, setIsError] = useState(false);
	const [jobTitle, setJobTitle] = useState("");
	const [jobDescription, setJobDescription] = useState("");
	const [jobLocation, setJobLocation] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const [jobsPerPage, setJobsPerPage] = useState(12);

	let indexOfLastJob = currentPage * jobsPerPage;
	let indexOfFirstJob = indexOfLastJob - jobsPerPage;
	let currentjobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

	let currentApplied = jobsApplied.slice(indexOfFirstJob, indexOfLastJob);
	useEffect(() => {
		if (user) {
			if (window.screen.width < 480) {
				setJobsPerPage(3);
			}

			if (window.screen.width < 860 && window.screen.width > 480) {
				setJobsPerPage(6);
			}

			axios
				.get(`${user.userRole ? "candidates" : "recruiters"}/jobs`, {
					headers: {
						authorization: user.token,
					},
				})
				.then((response) => {
					let res = [];

					res = user.userRole
						? response.data.data
						: response.data.data.data;

					setJobs(response.data.data ? res : []);
				})
				.catch((err) => console.log(err));

			if (user.userRole) {
				axios
					.get("candidates/jobs/applied", {
						headers: {
							authorization: user.token,
						},
					})
					.then((response) => {
						setJobsApplied(
							response.data.data ? response.data.data : []
						);
					})
					.catch((err) => console.log(err));
			}
		}
	}, [isSecondPage]);

	const handleApply = (job) => {
		axios
			.post(
				"candidates/jobs",
				{
					jobId: job.id,
				},
				{
					headers: {
						authorization: user.token,
					},
				}
			)
			.then((response) => {
				axios
					.get("candidates/jobs/applied", {
						headers: {
							authorization: user.token,
						},
					})
					.then((response) => {
						setJobsApplied(
							response.data.data ? response.data.data : []
						);
					})
					.then(() => setIsSecondPage(true))
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

	const showApplied = (job) => {
		axios
			.get(`recruiters/jobs/${job.id}/candidates`, {
				headers: {
					authorization: user.token,
				},
			})
			.then((response) => {
				setModalData(response.data.data ? response.data.data : []);
				setShowModal(true);
			})
			.catch((err) => console.log(err));
	};

	const logout = () => {
		localStorage.removeItem("user");
		setRedirect(true);
	};

	const post = (e) => {
		e.preventDefault();

		if (!jobTitle || !jobDescription || !jobLocation) {
			setIsError(true);
		} else {
			axios
				.post(
					"jobs/",
					{
						title: jobTitle,
						location: jobLocation,
						description: jobDescription,
					},
					{
						headers: {
							authorization: user.token,
						},
					}
				)
				.then((response) => {
					setCurrentPage(1);
					setIsSecondPage(false);
				})
				.catch((err) => console.log(err));
		}
	};

	const recruiterNav = (
		<div className="navbar__button">
			<button
				onClick={() => {
					setIsSecondPage(true);
					setShowModal(false);
				}}
			>
				Post a Job
			</button>
			<div className="navbar__avatar" onClick={logout}>
				<span>R</span>
				<span className="tooltiptext">Logout</span>
			</div>
			<i className="fa fa-caret-down fa-2x"></i>
		</div>
	);

	const candidateNav = (
		<div className="navbar__button">
			<button
				onClick={() => {
					setCurrentPage(1);
					setIsSecondPage(true);
				}}
			>
				Applied Jobs
			</button>
			<div className="navbar__avatar" onClick={logout}>
				<span>C</span>

				<span className="tooltiptext">Logout</span>
			</div>
			<i className="fa fa-caret-down fa-2x"></i>
		</div>
	);

	const createForm = (
		<div className="form__box">
			<h2>Post a job</h2>
			<form>
				<label htmlFor="title">Job Title*</label>
				<input
					type="text"
					name="title"
					value={jobTitle}
					onChange={(e) => setJobTitle(e.target.value)}
					placeholder="Enter the job title"
					required
				/>
				<label htmlFor="description">Job Description*</label>
				<input
					type="text"
					name="description"
					value={jobDescription}
					onChange={(e) => setJobDescription(e.target.value)}
					placeholder="Enter the job description"
					required
				/>
				<label htmlFor="location">Job Location*</label>
				<input
					type="text"
					name="location"
					value={jobLocation}
					onChange={(e) => setJobLocation(e.target.value)}
					placeholder="Enter the job location"
					required
				/>
				{!isError ? null : (
					<div className="form_error">All Fields are mandatory.</div>
				)}
				<button onClick={(e) => post(e)}>Post</button>
			</form>
		</div>
	);

	const noJobRecruiter = (
		<div className="rec_noJob">
			<span className="fa fa-file-text-o fa-4x"></span>
			<p>Your posted jobs will show here.</p>
			<div>
				<button onClick={() => setIsSecondPage(true)}>Post job</button>
			</div>
		</div>
	);

	if (!user || redirect) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			<Navbar
				navbar_button={
					<div>{!user.userRole ? recruiterNav : candidateNav}</div>
				}
			/>

			{!showModal ? null : (
				<Modal
					persons={modalData}
					close={() => {
						setShowModal(false);
					}}
				/>
			)}
			<div className="jobs">
				<div className="jobs__header">
					<h4>
						<span className="fa fa-home"></span>Home
						{!isSecondPage ? null : (
							<span className="breadCrumb">
								{!user.userRole
									? ` > Post a job`
									: ` > Applied jobs`}
							</span>
						)}
					</h4>
					<h2>
						{!user.userRole
							? `${isSecondPage ? "" : "Jobs posted by you"}`
							: `${
									isSecondPage
										? "Jobs applied by you"
										: "Jobs for you"
							  }`}
					</h2>
				</div>
				{isSecondPage ? (
					!user.userRole ? (
						createForm
					) : (
						<div className="jobs__box">
							{currentApplied.map((job) => {
								return <Job key={job.id} job={job} />;
							})}
						</div>
					)
				) : (
					<div className="jobs__box">
						{jobs.length == 0 && !user.userRole
							? noJobRecruiter
							: currentjobs.map((job) => {
									return (
										<Job
											key={job.id}
											job={job}
											button={
												!user.userRole ? (
													<div>
														<button
															onClick={() =>
																showApplied(job)
															}
														>
															View Applicantions
														</button>
													</div>
												) : (
													<div>
														<button
															onClick={() =>
																handleApply(job)
															}
														>
															Apply
														</button>
													</div>
												)
											}
										/>
									);
							  })}
					</div>
				)}

				{jobs.length == 0 ||
				(user.userRole && jobsApplied.length == 0) ||
				(!user.userRole && isSecondPage) ? null : (
					<div className="Pagination">
						<span
							className="fa fa-angle-left fa-4x"
							onClick={() =>
								setCurrentPage(
									currentPage == 1 ? 1 : currentPage - 1
								)
							}
							disabled
						></span>
						<p>{currentPage}</p>
						<span
							className="fa fa-angle-right fa-4x"
							onClick={() =>
								setCurrentPage(
									currentPage * jobsPerPage >= jobs.length ||
										(currentPage * jobsPerPage >=
											jobsApplied.length &&
											isSecondPage &&
											user.userRole)
										? currentPage
										: currentPage + 1
								)
							}
						></span>
					</div>
				)}
			</div>
		</div>
	);
};

export default Jobs;
