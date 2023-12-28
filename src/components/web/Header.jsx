//import react and hook
import React, { useState, useEffect } from "react";
//import toats
import toast from "react-hot-toast";

//import react router dom
import { Link, useHistory } from "react-router-dom";

//import BASE URL API
import { Api, ApiBaseUrl } from "../../api/index";

//import js cookie
import Cookies from "js-cookie";
import { Menu, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import DropAuth from "../utilities/DropAuth";
import { SearchAllNavbar } from "../utilities/home/SearchAll";

function WebHeader() {
	//state user logged in
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);

	//history
	const history = useHistory();

	const [titleSearch, setTitleSearch] = useState([]);
	const [hideNullData, setHideNullData] = useState(true);

	//token
	const token = Cookies.get("token");
	const userName = Cookies.get("user_name");

	//function "fetchDataUser"
	const fetchDataUser = async () => {
		// //fetching Rest API "user"
		await Api.get("/profile", {
			headers: {
				//header Bearer + Token
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				//set data to state
				setLoading(true);
				setUser(response.data.data);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	function queryTitle(event) {
		Api.get(`/search-all?keyword=${event.target.value}`).then((response) => {
			if (event.target.value === "") {
				setHideNullData(true);
				setTitleSearch(0);
			} else {
				setHideNullData(false);
				setTitleSearch(response.data.data);
			}
		});
	}

	//hook
	useEffect(() => {
		//if token already exists
		if (token) {
			//call function "fetchDataUser"
			fetchDataUser();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//function logout
	const logoutHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		await Api.post("/logout", null, {
			headers: {
				//header Bearer + Token
				Authorization: `Bearer ${token}`,
			},
		})
			.then(() => {
				//remove token
				Cookies.remove("token");
				Cookies.remove("user_id");
				Cookies.remove("user_name");
				Cookies.remove("status_verified");

				//show toast
				toast.success("Logout Successfully.", {
					duration: 4000,
					position: "top-right",
					className: "toast",
					style: {
						background: "#333",
						color: "#fff",
					},
				});
			})
			.finally(() => {
				//redirect login page
				history.push("/login");
				setLoading(false);
			});
	};

	return (
		<React.Fragment>
			<div className="flex items-center w-full max-w-screen-2xl fixed top-0 z-50 justify-around lg:justify-evenly bg-white gap-x-4 px-3 sm:px-5 md:px-10 lg:px-16 h-20 shadow-md">
				<NavLink to="/">
					<img
						src={ApiBaseUrl + "/" + `image-logo-login`}
						height={135}
						width={135}
						className=""
					/>
				</NavLink>
				<div className="flex items-center justify-between lg:space-x-24 space-x-2">
					<div className="space-x-14 relative flex items-center">
						<section className="hidden md:flex items-center gap-x-6">
							<NavLink
								exact={true}
								to="/"
								className={(isActive) =>
									!isActive
										? "text-gray-500 text-base font-semibold"
										: "text-[#229396] text-base font-semibold"
								}
							>
								Home
							</NavLink>
							<NavLink
								to="/wisata"
								className={(isActive) =>
									!isActive
										? "text-gray-500 text-base font-semibold"
										: "text-[#229396] text-base font-semibold"
								}
							>
								Wisata
							</NavLink>
							<NavLink
								to="/edukasi"
								className={(isActive) =>
									!isActive
										? "text-gray-500 text-base font-semibold"
										: "text-[#229396] text-base font-semibold"
								}
							>
								Edukasi
							</NavLink>
							<NavLink
								to="/blog"
								className={(isActive) =>
									!isActive
										? "text-gray-500 text-base font-semibold"
										: "text-[#229396] text-base font-semibold"
								}
							>
								Blog
							</NavLink>
							{/* <p className="text-gray-500 text-base font-semibold">Blog</p> */}
						</section>
					</div>
					<SearchAllNavbar />
					<button className="hidden md:block">
						{token ? (
							<Menu as="div" className="relative inline-block">
								<Menu.Button>
									<div className="flex px-2 lg:px-3 py-2 border-[1.25px] justify-between items-center border-[#229396] rounded-full">
										<p className="text-sm font-extrabold  w-24 truncate text-clip text-gray-500">
											{userName.substring(0, 12)}{" "}
										</p>
									</div>
								</Menu.Button>
								<Transition
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute right-0 w-40 mt-4 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="p-4 text-left ml-2 flex flex-col gap-y-2">
											<Menu.Item className="mb-1">
												<Link to="/user/account">
													<p className="text-sm text-gray-500 hover:text-black">
														Akun
													</p>
												</Link>
											</Menu.Item>

											<Menu.Item>
												<Link to="/user/my-favorite">
													<p className="text-sm text-gray-500 hover:text-black">
														Favorit Saya
													</p>
												</Link>
											</Menu.Item>
										</div>
										<hr className="block" />
										<div className="p-4 text-left ml-2 flex flex-col">
											<Menu.Item>
												<Link onClick={logoutHandler} disabled={loading}>
													<p className="text-sm text-red-400 hover:text-red-500 ">
														{loading ? (
															<div className="text-gray-500">Loading...</div>
														) : (
															"Keluar"
														)}
													</p>
												</Link>
											</Menu.Item>
										</div>
									</Menu.Items>
								</Transition>
							</Menu>
						) : (
							<div className="gap-x-2 lg:flex items-center">
								<Link to="/login">
									<button className="text-sm font-semibold bg-[#229396] hover:bg-[#005A98] transition ease-out duration-100 px-5 py-2 rounded-full text-white">
										Login
									</button>
								</Link>
								<Link to="/register">
									<button className="text-gray-500 text-base font-semibold">
										Register
									</button>
								</Link>
							</div>
						)}
					</button>
				</div>
				<div className="md:hidden">
					<DropAuth />
				</div>
			</div>
		</React.Fragment>
	);
}

export default WebHeader;
