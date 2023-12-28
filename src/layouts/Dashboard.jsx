import React, { useState, useEffect } from "react";
import { Api } from "../api";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import Header from "../components/web/Header";
import Sidebar from "../components/web/Sidebar";

const LayoutDashboard = ({ children }) => {
	//state user
	const setUser = useState({});
	const history = useHistory();
	const token = Cookies.get("token");

	//fetchData
	const fetchData = async () => {
		//fetch on Rest API
		await Api.get("/profile", {
			headers: {
				//header Bearer + Token
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			//set state "user"
			if(response.data.email_verified_at === null){
				history.push("/verify-email");
			}
			// else{
			// 	setUser(response.data);
			// }
		});
	};

	//hook useEffect
	useEffect(() => {
		//call function "fetchData"
		fetchData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<React.Fragment>
			<Header />
			<div className="px-10 mt-14 md:px-24 flex flex-col md:flex-row gap-x-4 items-start">
				<Sidebar />
				{children}
			</div>
		</React.Fragment>
	);
};

export default LayoutDashboard;
