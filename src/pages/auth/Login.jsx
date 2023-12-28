//import hook react
import React, { useState, useEffect } from "react";

//import BASE URL API
import { Api } from "../../api";

//import toats
import toast from "react-hot-toast";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

//import js cookie
import Cookies from "js-cookie";

//import react router dom
import { Link, useHistory, Redirect } from "react-router-dom";

//import layout web
import LayoutWeb from "../../layouts/Web";

function Login() {
	//title page
	document.title = "Login | Traveling";

	//state user
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordType, setPasswordType] = useState("password");

	//state loading
	const [isLoading, setLoading] = useState(false);

	//state validation
	const [validation, setValidation] = useState({});

	//history
	const history = useHistory();

	const togglePassword = (e) => {
		e.preventDefault();
		if (passwordType === "password") {
			setPasswordType("text");
		} else {
			setPasswordType("password");
		}
	};

	//function "loginHandler"
	const loginHandler = async (e) => {
		e.preventDefault();

		//set state isLoading to "true"
		setLoading(true);

		await Api.post("/login", {
			email: email,
			password: password,
		})
			.then((response) => {
				//set state isLoading to "false"
				setLoading(false);

				//show toast
				toast.success("Login Successfully.", {
					duration: 4000,
					position: "top-right",
					className: "toast",
					style: {
						background: "#333",
						color: "#fff",
					},
				});
				//set cookie
				Cookies.set("token", response.data.data.token);
				Cookies.set("user_id", response.data.user_id);
				Cookies.set("user_name", response.data.user_name);
				Cookies.set("status_verified", response.data.status_verified);

				//redirect dashboard page
				history.push("/user/account");
			})
			.catch((error) => {
				//set state isLoading to "false"
				setLoading(false);

				//set error response validasi to state "validation"
				setValidation(error.response.data);
			});
	};

	const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

	useEffect(() => {
		scrollToTop();
	}, []);

	if (Cookies.get("token")) {
		//redirect dashboard page
		return <Redirect to="/user/dashboard"></Redirect>;
	}

	return (
		<React.Fragment>
			<LayoutWeb>
				<div className="mx-auto w-96 bg-white px-6 py-6 rounded-xl shadow-2xl mb-24 mt-20">
					<h5 className="lg:text-[32px] font-semibold">Login</h5>
					<form onSubmit={loginHandler}>
						<div className="space-y-2 mt-8">
							{validation.message && (
								<div
									class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
									role="alert"
								>
									<span class="block sm:inline">{validation.message}</span>
								</div>
							)}
							<section className="flex flex-col gap-y-2">
								<label htmlFor="email" className="block font-bold">
									Email
								</label>
								<input
									type="email"
									className="w-full px-4 py-2  placeholder:text-sm bg-gray-100 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Masukkan email anda"
								/>
								{validation.email && (
									<div className="text-red-500">{validation.email[0]}</div>
								)}
							</section>
							<section className="flex flex-col gap-y-2">
								<label htmlFor="password" className="block font-bold">
									Kata sandi
								</label>
								<div className="flex flex-row gap-y-2">
									<input
										type={passwordType}
										className="w-full px-4 py-2  placeholder:text-sm bg-gray-100 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Masukkan kata sandi"
									/>
									<Link
										className="btn bg-gray-100 rounded-md ml-1 p-3 text-black"
										onClick={togglePassword}
									>
										{passwordType === "password" ? (
											<BsFillEyeSlashFill />
										) : (
											<BsFillEyeFill />
										)}
									</Link>
								</div>
								{validation.password && (
									<div className="text-red-500">{validation.password[0]}</div>
								)}
							</section>
						</div>
						<div className="flex items-center justify-between mt-4">
							<section className="flex items-center gap-2">
								<input
									className="border border-gray-200 mb-0"
									type="checkbox"
									name="remember"
									id="remember"
								/>
								<label className="mb-0" htmlFor="remember">
									Ingat saya
								</label>
							</section>
							<section className="flex items-center gap-2">
								<Link className="text-[#229396]" to="/forgot-password">
									Lupa kata sandi?
								</Link>
							</section>
						</div>
						<button
							type="submit"
							disabled={isLoading}
							className="w-full px-6 py-2 mt-4 text-white bg-[#229396] rounded-lg hover:bg-[#005A98]"
						>
							{isLoading ? " Loading..." : "Login"}
						</button>
						<p className="mt-4 text-center text-sm font-normal">
							Belum punya akun?{" "}
							<Link
								to="/register"
								className="text-[#229396] underline-offset-8"
							>
								Buat sebuah akun
							</Link>
						</p>
					</form>
				</div>
			</LayoutWeb>
		</React.Fragment>
	);
}

export default Login;
