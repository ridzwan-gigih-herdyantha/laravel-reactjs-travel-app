//import hook react
import React, { useState, useEffect } from "react";

//import BASE URL API
import { Api } from "../../api";

//import toats
import toast from "react-hot-toast";

//import react router dom
import { useHistory } from "react-router-dom";

//import layout web
import LayoutWeb from "../../layouts/Web";

function ForgotPassword() {
	//title page
	document.title = "Traveling | Forgot Password";

	//state user
	const [email, setEmail] = useState("");

	//state loading
	const [isLoading, setLoading] = useState(false);

	//state validation
	const [validation, setValidation] = useState({});

	//history
	const history = useHistory();

	//function "loginHandler"
	const forgotHandler = async (e) => {
		e.preventDefault();

		//set state isLoading to "true"
		setLoading(true);

		await Api.post("/forgot-password", {
			email: email,
		})
			.then((response) => {
				//set state isLoading to "false"
				setLoading(false);

				//show toast
				toast.success("Please Check your Mailbox to reset password!", {
					duration: 4000,
					position: "top-right",
					className: "toast",
					style: {
						background: "#333",
						color: "#fff",
					},
				});

				//redirect dashboard page
				history.push("/login");
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
				<div className="mx-auto w-96 bg-white px-6 py-6 rounded-xl shadow-2xl mt-24 mb-44">
					<h5 className="lg:text-[32px] font-semibold">
						Atur Ulang Kata Sandi
					</h5>
					<form onSubmit={forgotHandler}>
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
									Alamat Email
								</label>
								<input
									type="email"
									className="w-full px-4 py-2  placeholder:text-sm bg-gray-100 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Email Address"
								/>
								{validation.email && (
									<div className="text-red-500">{validation.email[0]}</div>
								)}
							</section>
						</div>
						<button
							type="submit"
							disabled={isLoading}
							className="w-full px-6 py-2 mt-4 text-white bg-[#229396] rounded-lg hover:bg-blue-900"
						>
							{isLoading ? "Loading..." : "Kirim"}
						</button>
					</form>
				</div>
			</LayoutWeb>
		</React.Fragment>
	);
}

export default ForgotPassword;
