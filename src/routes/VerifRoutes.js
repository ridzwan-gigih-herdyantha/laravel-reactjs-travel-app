//import cookie
import Cookies from "js-cookie";

//import react router dom
import { Route, Redirect } from "react-router-dom";

function VerifRoutes({ children, ...rest }) {
	const token = Cookies.get("token");
	const status = Cookies.get("status_verified");

	return (
		<Route {...rest}>
			{token && status === 'false' ? children : <Redirect to="/" />}
		</Route>
	);
}

export default VerifRoutes;
