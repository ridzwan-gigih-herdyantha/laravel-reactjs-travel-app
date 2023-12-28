import React, { useState, useEffect } from "react";
import LayoutWeb from "../../layouts/Web";
import { useParams } from "react-router-dom";
import { Api } from "../../api";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

function ResetPassword() {
	const history = useHistory();
	const { token } = useParams();
	const [isLoading, setLoading] = useState(false);
	const [password, setPassword] = useState("");
	const [confirm_password, setConfirmPassword] = useState("");
	const [validation, setValidation] = useState({});

	const reset = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("token", token);
		formData.append("password", password);
		formData.append("confirm_password", confirm_password);
		await Api.post("/reset-password", formData)
			.then((response) => {
				setLoading(false);

				toast.success("New Password has been created!", {
					duration: 4000,
					position: "top-right",
					className: "toast",
					style: {
						background: "#333",
						color: "#fff",
					},
				});

				history.push("/login");
			})
			.catch((error) => {
				setLoading(false);
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
		<LayoutWeb>
			<div className="mx-auto w-96 mt-36 pb-6">
				<h5 className="text-4xl mt-2 font-bold text-center text-[#033050]">
					Atur Ulang Kata Sandi
				</h5>
				<p className="text-sm font-normal text-center mt-3 text-[#033050]">
					Silakan buat kata sandi baru Anda
				</p>
				<form onSubmit={reset}>
					<section className="space-y-2 mb-4">
						<label className="text-sm text-[#033050]" htmlFor="newPassword">
							Kata sandi baru
						</label>
						<input
							className="w-full px-4 py-2  placeholder:text-sm bg-gray-100 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500"
							type="password"
							name="newPassword"
							id="text"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Masukkan kata sandi baru"
						/>
					</section>
					{validation.password && (
						<div className="alert alert-danger text-red-500 ">
							{validation.password[0]}
						</div>
					)}
					<section className="space-y-2">
						<label className="text-sm text-[#033050]" htmlFor="repass">
							Konfirmasi kata sandi
						</label>
						<input
							className="w-full px-4 py-2  placeholder:text-sm bg-gray-100 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500"
							type="password"
							name="repass"
							id="text"
							value={confirm_password}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="Masukkan ulang kata sandi"
						/>
					</section>
					{validation.confirm_password && (
						<div className="alert alert-danger text-red-500 ">
							{validation.confirm_password[0]}
						</div>
					)}
					<button className="bg-[#229396] rounded-lg hover:bg-[#005A98] py-2 mt-6 w-full text-center font-extrabold text-sm text-white">
						{isLoading ? " Loading..." : "Kirim"}
					</button>
				</form>
			</div>
		</LayoutWeb>
	);
}

export default ResetPassword;
