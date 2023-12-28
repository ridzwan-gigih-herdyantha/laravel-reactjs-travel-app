import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import LayoutWeb from "../../layouts/Web";
import { Api } from "../../api";

export default function VerifyEmail() {
	const [isLoading, setLoading] = useState(false);
	const [isLoadingOtp, setLoadingOpt] = useState(false);
	const [validation, setValidation] = useState({});
	const [validation_otp, setValidationOtp] = useState({});
	const [otp, setOtp] = useState("");
	const token = Cookies.get("token");
	const history = useHistory();

	const verifHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData();
		formData.append("otp", otp);

		await Api.post("/verify-otp", formData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				//set state isLoading to "false"
				setLoading(false);

				//show toast
				toast.success("Email has been successfully verified!", {
					duration: 4000,
					position: "top-right",
					className: "toast",
					style: {
						background: "#333",
						color: "#fff",
					},
				});
				// console.log(response);
				// process.exit()
				//set cookie
				Cookies.set("token", response.data.data.token);
				Cookies.set("status_verified", true);

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
	const resendOtp = async (e) => {
		setLoadingOpt(true);
		await Api.post("/send-otp", null, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				setLoadingOpt(false);
				toast.success("OTP code has been resent!", {
					duration: 4000,
					position: "top-right",
					className: "toast",
					style: {
						background: "#333",
						color: "#fff",
					},
				});
			})
			.catch((error) => {
				setLoadingOpt(false);
				setValidationOtp(error.response.data);
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
		<>
			<LayoutWeb>
				<div className="pt-28">
					<div className="mx-auto w-96 px-6 py-6 bg-white rounded-xl shadow-md">
						<h5 className="text-xl mt-6 font-bold text-center">
							Verifikasi Email
						</h5>
						<p className="text-sm font-normal text-center mt-2 text-gray-500">
							OTP telah terkirim di email Anda,
							<br />
							silahkan cek inbox atau spam
						</p>
						<form onSubmit={verifHandler}>
							<input
								type="text"
								style={{ paddingLeft: "1rem" }}
								maxLength="6"
								className="bg-none mt-4 w-full px-2 border-2 border-[#B0D4ED] py-1 rounded-md focus:outline-none"
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
							/>
							{validation.message && (
								<div className="alert alert-danger text-red-500 text-xs">
									{validation.message}
								</div>
							)}
							{validation.otp && (
								<div className="alert alert-danger text-red-500">
									{validation.otp[0]}
								</div>
							)}
							<div className="flex gap-x-2 justify-between items-center mt-1">
								<button
									className="mt-2 bg-[#229396] rounded-lg hover:bg-[#005A98] py-2 w-full text-center text-white"
									type="submit"
									disabled={isLoading}
								>
									{" "}
									{isLoading ? "Loading..." : "Verifikasi"}{" "}
								</button>
							</div>
						</form>

						<button
							onClick={() => resendOtp()}
							className="text-base text-center font-normal mt-2 w-full text-gray-500"
							disabled={isLoadingOtp}
						>
							{" "}
							{isLoadingOtp ? "Loading..." : "Kirim ulang OTP"}{" "}
						</button>
						{validation_otp.message && (
							<div className="alert alert-danger text-blue-500">
								{validation_otp.message}
							</div>
						)}
					</div>
				</div>
			</LayoutWeb>
		</>
	);
}
