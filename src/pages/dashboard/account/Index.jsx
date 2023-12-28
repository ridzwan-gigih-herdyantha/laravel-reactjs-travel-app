import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Dashboard";
import { Api } from "../../../api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

function Account() {
	document.title = "Traveling | Account";
	const [name, setNamed] = useState("");
	//state loading
	const [isLoading, setLoading] = useState(false);
	const [isLoadingPassword, setLoadingPassword] = useState(false);
	const [current_password, setCurrentPassword] = useState("");
	const [new_password, setNewPassword] = useState("");
	const [confirm_password, setConfirmPassword] = useState("");

	//state validation
	const [validation, setValidation] = useState({});
	//hook
	const token = Cookies.get("token");
	const history = useHistory();
	//fetchData
	const fetchData = async () => {
		//fetch on Rest API
		await Api.get("/profile", {
			headers: {
				//header Bearer + Token
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			setNamed(response.data.data.name);
		});
	};
	
	const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

	//hook useEffect
	useEffect(() => {
		//call function "fetchData"
		scrollToTop();
		fetchData();
	}, []);

	//function "updateAccount"
	const updateAccount = async (e) => {
		e.preventDefault();
		setLoading(true);
		//define formData
		const formData = new FormData();

		formData.append("name", name);
		formData.append("_method", "POST");

		await Api.post(`/profile`, formData, {
			//header
			headers: {
				//header Bearer + Token
				Authorization: `Bearer ${token}`,
			},
		})
			.then(() => {
				//set state isLoading to "false"
				setLoading(false);
				//show toast
				toast.success("Data Updated!", {
					duration: 4000,
					position: "top-right",
					className: "toast",
					style: {
						background: "#333",
						color: "#fff",
					},
				});

				//redirect dashboard page
				history.push("/user/account");
				setValidation(false);
				setTimeout(function () {
					Cookies.set("user_name", name);
					window.location.reload(1);
				}, 2000);
			})
			.catch((error) => {
				//set state isLoading to "false"
				setLoading(false);

				//set state "validation"
				setValidation(error.response.data.errors);
			});
	};

	//function "updateAccount"
	const updatePassword = async (e) => {
		e.preventDefault();
		setLoadingPassword(true);

		await Api.post(
			`/update-password`,
			{
				current_password: current_password,
				new_password: new_password,
				confirm_password: confirm_password,
			},
			{
				//header
				headers: {
					//header Bearer + Token
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then(() => {
				//set state isLoading to "false"
				setLoadingPassword(false);

				//show toast
				toast.success("Password Updated Successfully!", {
					duration: 4000,
					position: "top-right",
					className: "toast",
					style: {
						background: "#333",
						color: "#fff",
					},
				});

				//redirect dashboard page
				history.push("/user/account");
				setValidation(false);
				setCurrentPassword("");
				setNewPassword("");
				setConfirmPassword("");
				setTimeout(function () {
					window.location.reload(1);
				}, 2000);
			})
			.catch((error) => {
				//set state isLoading to "false"
				setLoadingPassword(false);

				//set state "validation"
				// console.log(error.response);
				setValidation(error.response.data);
			});
	};

	const [showName, setShowName] = useState();
	const [showPass, setShowPass] = useState();
	return (
		<React.Fragment>
			<LayoutAdmin>
				<div className="grid grid-cols-1 gap-y-4">
					<section className="flex flex-col justify-start">
						<h5 className="text-3xl font-semibold">Account Information</h5>
						<p className="text-base font-normal text-gray-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
							sapiente voluptas praesentium.
						</p>
					</section>
					<hr className="w-full" />
					<section className="flex flex-row justify-between">
						<h5 className="text-base font-medium">Name</h5>
						<p className="text-sm font-normal w-96 text-gray-500 mb-0">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
							adipisci accusamus culpa pariatur
						</p>
						<button
							onClick={() => setShowName(!showName)}
							className="text-blue-900 text-base font-medium"
						>
							Change name
						</button>
					</section>
					{/* showing name input */}
					{showName ? (
						<section className="flex items-center justify-between">
							<form
								onSubmit={updateAccount}
								className="space-y-2 w-full items-start flex justify-between"
							>
								<div className="flex flex-col gap-y-2 w-96">
									<label
										htmlFor="name"
										className="text-sm font-normal text-gray-800"
									>
										Name
									</label>
									<input
										type="text"
										value={name}
										onChange={(e) => setNamed(e.target.value)}
										placeholder="Enter your name"
										className="border-b text-sm focus:outline-none"
									/>
									{validation.name && (
										<div className="text-red-500">{validation.name[0]}</div>
									)}
								</div>
								<button
									type="submit"
									className="bg-black px-4 py-2 rounded-lg text-sm text-white"
									disabled={isLoading ? true : false}
								>
									{isLoading ? "Loading..." : "Save Change"}
								</button>
							</form>
						</section>
					) : null}
					<hr className="w-full" />
					<section className="flex flex-row justify-between items-start">
						<h5 className="text-base font-medium">Password</h5>
						<p className="text-sm font-normal w-96 text-gray-500 mb-0">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
							adipisci accusamus culpa pariatur
						</p>
						<button
							onClick={() => setShowPass(!showPass)}
							className="text-blue-900 text-base font-medium"
						>
							Change password
						</button>
					</section>
					{/* showing email input */}
					{showPass ? (
						<section className="flex items-center justify-between">
							<form
								onSubmit={updatePassword}
								className="space-y-2 w-full items-start flex justify-between"
							>
								<div className="flex flex-col gap-y-2 w-96">
									<label
										htmlFor="name"
										className="text-sm font-normal text-gray-800"
									>
										Password
									</label>
									<div className="space-y-4 flex flex-col w-96">
										<input
											type="password"
											value={current_password}
											onChange={(e) => setCurrentPassword(e.target.value)}
											placeholder="Enter your current password"
											className="border-b text-sm focus:outline-none"
										/>
										{validation.current_password ? (
											<div className="text-red-500">
												{validation.current_password[0]}
											</div>
										) : (
											<div className="text-red-500">{validation.message}</div>
										)}
										<input
											type="password"
											value={new_password}
											onChange={(e) => setNewPassword(e.target.value)}
											placeholder="Enter your new password"
											className="border-b text-sm focus:outline-none"
										/>
										{validation.new_password ? (
											<div className="text-red-500">
												{validation.new_password[0]}
											</div>
										) : (
											<div className="text-red-500"></div>
										)}
										<input
											type="password"
											value={confirm_password}
											onChange={(e) => setConfirmPassword(e.target.value)}
											placeholder="Re type your new password"
											className="border-b text-sm focus:outline-none"
										/>
										{validation.confirm_password && (
											<div className="text-red-500">
												{validation.confirm_password[0]}
											</div>
										)}
									</div>
								</div>
								<button
									className="bg-black px-4 py-2 rounded-lg text-sm text-white"
									disabled={isLoadingPassword ? true : false}
								>
									{isLoadingPassword ? "Loading..." : "Save Change"}
								</button>
							</form>
						</section>
					) : null}
				</div>
			</LayoutAdmin>
		</React.Fragment>
	);
}

export default Account;
