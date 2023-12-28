//import layout
import React, { useEffect } from "react";

//import layout web
import LayoutAdmin from "../../../layouts/Dashboard";

function ChangePassword() {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	//hook
	useEffect(() => {
		scrollToTop();
	}, []);

	return (
		<React.Fragment>
			<LayoutAdmin>
				<div className="px-8 py-6 mx-4 mt-4 text-left bg-white border-2 border-gray-100 md:w-1/3 lg:w-1/3 sm:w-1/3 rounded-xl">
					<h3 className="text-2xl font-bold text-left">Change Password</h3>
					<hr />
					<form action="">
						<div className="mt-4">
							<label className="block font-bold" for="Name">
								Current Password
							</label>
							<input
								type="text"
								placeholder="Enter your current password"
								className="w-full px-4 py-2 mt-2 placeholder:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
							/>
						</div>
						<div className="mt-4">
							<label className="block font-bold">New Password</label>
							<input
								type="password"
								placeholder="Enter your new password"
								className="w-full px-4 py-2 mt-2 placeholder:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
							/>
						</div>
						<div className="mt-4">
							<label className="block font-bold">Confirm Password</label>
							<input
								type="password"
								placeholder="Enter your new password again"
								className="w-full px-4 py-2 mt-2 placeholder:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
							/>
						</div>
						<div className="flex">
							<button class="ml-auto w-48 px-6 py-2 mt-4 text-white bg-gray-600 rounded-lg hover:bg-[#003580]">
								Save Changes
							</button>
						</div>
					</form>
				</div>
			</LayoutAdmin>
		</React.Fragment>
	);
}

export default ChangePassword;
