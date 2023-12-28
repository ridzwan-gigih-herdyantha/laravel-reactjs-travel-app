//import react router dom
import { Switch, Route } from "react-router-dom";

//auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ResetPassword from "../pages/auth/ResetPassword";

//web
import Home from "../pages/web/home/Index";
import Blog from "../pages/web/blog/Index";
import Tours from "../pages/web/tour/Index";
import TourDetail from "../pages/web/tour/Detail";
import Educations from "../pages/web/education/Index";
import EducationDetail from "../pages/web/education/Detail";

//dashboard
import PrivateRoute from "./PrivateRoutes";
import VerifRoutes from "./VerifRoutes";
import Dashboard from "../pages/dashboard/Index";
import Account from "../pages/dashboard/account/Index";
import MyFavorite from "../pages/dashboard/favorites/Index";
import Purchase from "../pages/dashboard/purchase/index";
import ChangePassword from "../pages/dashboard/change-password/Index";
import BlogDetail from "../pages/web/blog/Detail";
import AboutUs from "../pages/misc/AboutUs";
import FAQ from "../pages/misc/FAQ";
import Pricing from "../pages/misc/Pricing";

function Routes() {
	return (
		<Switch>
			<PrivateRoute exact path="/user/dashboard">
				<Dashboard />
			</PrivateRoute>

			<PrivateRoute exact path="/user/account">
				<Account />
			</PrivateRoute>

			<PrivateRoute exact path="/user/change-password">
				<ChangePassword />
			</PrivateRoute>

			<PrivateRoute exact path="/user/my-favorite">
				<MyFavorite />
			</PrivateRoute>

			<PrivateRoute exact path="/user/purchase">
				<Purchase/>
			</PrivateRoute>

			{/* route "/login" */}
			<Route exact path="/login">
				<Login />
			</Route>

			{/* route "/register" */}
			<Route exact path="/register">
				<Register />
			</Route>

			{/* route "/forgot-password" */}
			<Route exact path="/forgot-password">
				<ForgotPassword />
			</Route>

			{/* route "/verify-email" */}
			<VerifRoutes exact path="/verify-email">
				<VerifyEmail />
			</VerifRoutes>

			{/* route "/reset-password" */}
			<Route exact path="/reset-password/:token">
				<ResetPassword />
			</Route>

			{/* route "/" */}
			<Route exact path="/">
				<Home />
			</Route>

			{/* route "/Tour" */}
			<Route exact path="/wisata">
				<Tours />
			</Route>
			{/* private route "/wisata/:slug" */}
			<Route exact path="/wisata/:slug">
				<TourDetail />
			</Route>

			{/* route "/Education" */}
			<Route exact path="/edukasi">
				<Educations />
			</Route>
			{/* private route "/edukasi/:slug" */}
			<Route exact path="/edukasi/:slug">
				<EducationDetail />
			</Route>

			{/* route "/Article" */}
			<Route exact path="/blog">
				<Blog />
			</Route>

			{/* route blog/:slug */}
			<Route exact path="/blog/:slug">
				<BlogDetail />
			</Route>

			{/* pathing & linking on footer */}
			<Route exact path="/about-us">
				<AboutUs />
			</Route>

			<Route exact path="/faq">
				<FAQ />
			</Route>

			<Route exact path="/pricing">
				<Pricing />
			</Route>
		</Switch>
	);
}

export default Routes;
