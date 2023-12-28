import React, { useState, useEffect } from "react";
import { Api } from "../../api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Link, useHistory } from "react-router-dom";
import LayoutWeb from "../../layouts/Web";

function Register() {
	//title page
	document.title = "Traveling | Register";

	//state user
	const [name, setNamed] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password_confirmation, setPasswordConfirmation] = useState("");

	//state loading
	const [isLoading, setLoading] = useState(false);

	//state validation
	const [validation, setValidation] = useState({});

	//history
	const history = useHistory();

	//function "loginHandler"
	const RegisterHandler = async (e) => {
		e.preventDefault();

		//set state isLoading to "true"
		setLoading(true);

		await Api.post("/register", {
			name: name,
			email: email,
			password: password,
			password_confirmation: password_confirmation,
		})
			.then((response) => {
				//set state isLoading to "false"
				setLoading(false);
				// console.log(response);
				// process.exit();

				//show toast
				toast.success("Register Successfully.", {
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
				Cookies.set("status_verified", false);

				//redirect dashboard page
				setTimeout(function () {
					window.location.replace("/verify-email");
				}, 2000);
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
	
	return (
		<React.Fragment>
			<LayoutWeb>
				<div className="mx-auto w-96 bg-white px-6 py-6 rounded-xl shadow-2xl  mb-24 mt-20">
					<h5 className="lg:text-[32px] font-semibold">Registrasi</h5>
					<form onSubmit={RegisterHandler}>
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
								<label htmlFor="name" className="block font-bold">
									Nama
								</label>
								<input
									type="text"
									className="w-full px-4 py-2  placeholder:text-sm bg-gray-100 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500"
									value={name}
									onChange={(e) => setNamed(e.target.value)}
									placeholder="Masukan Nama Anda"
								/>
								{validation.name && (
									<div className="text-red-500">{validation.name[0]}</div>
								)}
							</section>
							<section className="flex flex-col gap-y-2">
								<label htmlFor="email" className="block font-bold">
									Email
								</label>
								<input
									type="email"
									className="w-full px-4 py-2  placeholder:text-sm bg-gray-100 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Alamat Email"
								/>
								{validation.email && (
									<div className="text-red-500">{validation.email[0]}</div>
								)}
							</section>
							<section className="flex flex-col gap-y-2">
								<label htmlFor="password" className="block font-bold">
									Kata sandi
								</label>
								<input
									type="password"
									className="w-full px-4 py-2  placeholder:text-sm bg-gray-100 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Masukkan kata sandi"
								/>
								{validation.password && (
									<div className="text-red-500">{validation.password[0]}</div>
								)}
							</section>
							<section className="flex flex-col gap-y-2">
								<label
									htmlFor="password_confirmation"
									className="block font-bold"
								>
									Konfirmasi kata sandi
								</label>
								<input
									type="password"
									className="w-full px-4 py-2  placeholder:text-sm bg-gray-100 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500"
									value={password_confirmation}
									onChange={(e) => setPasswordConfirmation(e.target.value)}
									placeholder="Masukkan ulang kata sandi"
								/>
								{validation.password_confirmation && (
									<div className="text-red-500">
										{validation.password_confirmation[0]}
									</div>
								)}
							</section>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full px-6 py-2 mt-4 text-white bg-[#229396] rounded-lg hover:bg-[#005A98]"
						>
							{isLoading ? "Loading..." : "Registrasi"}
						</button>
						<p className="mt-4 text-center text-sm font-normal">
							Sudah punya akun?{" "}
							<Link to="/login" className="text-[#229396] underline-offset-8">
								Login
							</Link>
						</p>
					</form>
				</div>
			</LayoutWeb>
		</React.Fragment>
	);
}

export default Register;
