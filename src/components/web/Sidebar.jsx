import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineAccountCircle, MdOutlineLogout, MdPayment } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { useHistory } from "react-router-dom";
//import toats
import toast from "react-hot-toast";

//import BASE URL API
import { Api } from "../../api";
//import js cookie
import Cookies from "js-cookie";

function Sidebar() {
	//state user logged in
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	//token
	const token = Cookies.get("token");

	//function logout
	const logoutHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		await Api.post("/logout", null, {
			headers: {
				//header Bearer + Token
				Authorization: `Bearer ${token}`,
			},
		}).then(() => {
			setLoading(false);
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

			//redirect login page
			history.push("/login");
		});
	};

	return (
		<>
			<section className="flex mb-6 mr-28 md:mb-0 items-center md:items-start md:flex-col flex-row justify-between px-4 md:px-0 md:space-y-2 border-2 w-full md:w-64 py-2">
				<NavLink
					to="/user/account"
					className={(isActive) =>
						!isActive
							? "text-gray-500 md:ml-4 text-base font-normal flex items-center gap-x-1"
							: "text-black md:ml-4  text-base font-semibold flex items-center gap-x-1"
					}
				>
					<MdOutlineAccountCircle />
					<p className="font-normal">Akun</p>
				</NavLink>
				<hr className="md:w-full md:block hidden" />
				<NavLink
					to="/user/my-favorite"
					className={(isActive) =>
						!isActive
							? "text-gray-500 md:ml-4 text-base font-normal flex items-center gap-x-1"
							: "text-black md:ml-4 text-base font-semibold flex items-center gap-x-1"
					}
				>
					<AiOutlineHeart />
					<p className="font-normal">Favorit Saya</p>
				</NavLink>
				<hr className="md:w-full md:block hidden" />
				<NavLink
					to="/user/purchase"
					className={(isActive) =>
						!isActive
							? "text-gray-500 md:ml-4 text-base font-normal flex items-center gap-x-1"
							: "text-black md:ml-4 text-base font-semibold flex items-center gap-x-1"
					}
				>
					<MdPayment />
					<p className="font-normal">Riwayat Pembayaran</p>
				</NavLink>
				<hr className="md:w-full md:block hidden" />
				<NavLink
					to="/logout"
					className={(isActive) =>
						!isActive
							? "text-gray-500 md:ml-4 text-base font-normal flex items-center gap-x-1"
							: "text-black md:ml-4 text-base font-semibold flex items-center gap-x-1"
					}
					onClick={logoutHandler}
				>
					<MdOutlineLogout />
					<p className="font-normal">
						{loading ? (
							<div className="text-gray-500">Loading...</div>
						) : (
							"Keluar"
						)}
					</p>
				</NavLink>
			</section>
		</>
	);
}

export default Sidebar;
