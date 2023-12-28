//import cookie
import Cookies from "js-cookie";

//import react router dom
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
	//token from cookie
	const token = Cookies.get("token");
	const status = Cookies.get("status_verified");
	return (
		<Route {...rest}>
			{token && status === "true" ? (
				children
			) : token && status === "false" ? (
				<Redirect to="/verify-email" />
			) : (
				<Redirect to="/" />
			)}
		</Route>
	);
}

export default PrivateRoute;
