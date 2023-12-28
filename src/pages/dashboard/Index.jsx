//import layout
import React, { useEffect } from "react";

//import layout web
import LayoutAdmin from "../../layouts/Dashboard";

function Dashboard() {
	const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

	//hook
	useEffect(() => {
		scrollToTop();
	}, []);

	return (
		<React.Fragment>
			<LayoutAdmin>
				<p>dashboard</p>
			</LayoutAdmin>
		</React.Fragment>
	);
}

export default Dashboard;
