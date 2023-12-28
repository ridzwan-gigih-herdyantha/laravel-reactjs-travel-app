import React, { useState, useEffect } from "react";
import { BsCheck } from "react-icons/bs";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Api } from "../../../api";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function CardPrice(props) {
	const [loading, setLoading] = useState(false);
	const [currentPackage, setCurrentPackage] = useState([]);
	const [checking, setChecking] = useState([]);
	const history = useHistory();
	const token = Cookies.get("token");

	const numberFormat = (value) =>
		new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(value);

	const fetchDataCurrentPackage = async () => {
		//define page variable
		if (token) {
			await Api.get(`/current-package`, {
				headers: {
					//header Bearer + Token
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => {
					setChecking(true);
					setCurrentPackage(response.data.data);
				})
				.catch(() => {
					setCurrentPackage(0);
				})
				.finally(() => {
					setChecking(false);
				});
		}
	};

	const BuyPackage = async (e) => {
		setLoading(true);
		Swal.fire({
			title: "Anda Yakin?",
			text: "Memilih paket ini",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#5cb85c",
			cancelButtonColor: "#d33",
			confirmButtonText: "Ya, pilih paket!",
		}).then((result) => {
			// console.log(result);
			// process.exit();
			if (result.isConfirmed) {
				Api.post(
					"/subscribe",
					{
						package_id: e,
					},
					{
						headers: {
							//header Bearer + Token
							Authorization: `Bearer ${token}`,
						},
					}
				)
					.then((response) => {
						// console.log(response)
						// process.exit();
						toast.success(
							"Please wait while redirecting!",
							{
								duration: 4000,
								position: "top-right",
								className: "toast",
								style: {
									background: "#333",
									color: "#fff",
								},
							},
							setTimeout(function () {
								window.location.replace(`${response.data.url}`);
							}, 2000)
						);
					})
					.catch((error) => {
						// console.log(error)
						// process.exit();
						setLoading(false);
						Swal.fire({
							confirmButtonColor: "#827B7E",
							title: "Oops...",
							text: "Terjadi Kesalahan!",
							icon: "error",
						});
					});
			} else {
				setLoading(false);
			}
		});
	};

	const ChangePackage = async (e) => {
		setLoading(true);
		Swal.fire({
			title: "Ingin ganti Paket?",
			text: "Anda masih memiliki paket aktif, paket otomatis akan HILANG jika anda melanjutkan",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Ya, hapus paket saya!",
		}).then((result) => {
			// console.log(result);
			// process.exit();
			if (result.isConfirmed) {
				Swal.fire({
					title: "Apakah Anda Yakin?",
					text: "Anda tidak bisa mengembalikan paket yang telah HILANG!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#5cb85c",
					cancelButtonColor: "#d33",
					confirmButtonText: "Ya, saya sangat yakin!",
					reverseButtons: true,
				}).then((result) => {
					if (result.isConfirmed) {
						Api.post(
							"/subscribe",
							{
								package_id: e,
							},
							{
								headers: {
									//header Bearer + Token
									Authorization: `Bearer ${token}`,
								},
							}
						)
							.then((response) => {
								// console.log(response)
								// process.exit();
								toast.success(
									"Please wait while redirecting!",
									{
										duration: 4000,
										position: "top-right",
										className: "toast",
										style: {
											background: "#333",
											color: "#fff",
										},
									},
									setTimeout(function () {
										window.location.replace(`${response.data.url}`);
									}, 2000)
								);
							})
							.catch((error) => {
								setLoading(false);
								Swal.fire({
									confirmButtonColor: "#827B7E",
									title: "Oops...",
									text: "Terjadi Kesalahan!",
									icon: "error",
								});
							});
					} else {
						setLoading(false);
					}
				});
			} else {
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		fetchDataCurrentPackage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="mb-8">
			{props.highlighted === 0 ? (
				<div className="border h-full p-8 rounded-xl mt-4">
					<h5 className="text-lg font-medium mb-4">{props.name}</h5>
					<div className="text-center">
						{props.amount === 0 ? (
							<h5 className="text-3xl font-extrabold">Gratis</h5>
						) : (
							<h5 className="text-3xl font-extrabold">
								{numberFormat(props.amount)}
							</h5>
						)}
						{token ? (
							<div>
								{props.amount === 0 ? (
									<button
										className="w-40 text-center text-white mt-4 py-2 bg-[#827B7E] rounded-lg"
										disabled
									>
										Tidak Dapat Dipilih
									</button>
								) : (
									<div>
										{currentPackage === 0 ||
										currentPackage.status === "STOPPED" ? (
											<button
												className="w-40 text-center text-white mt-4 py-2 bg-[#827B7E] rounded-lg hover:bg-[#322F30]"
												onClick={() => BuyPackage(props.id)}
												disabled={checking}
											>
												{loading
													? "Loading..."
													: checking
													? "Loading"
													: "Pilih"}
											</button>
										) : (
											<button
												className="w-40 text-center text-white mt-4 py-2 bg-[#827B7E] rounded-lg hover:bg-[#322F30]"
												onClick={() => ChangePackage(props.id)}
												disabled={checking}
											>
												{loading
													? "Loading..."
													: checking
													? "Loading"
													: "Ganti"}
											</button>
										)}
									</div>
								)}
							</div>
						) : (
							<div>
								<button
									className="w-40 text-center text-white mt-4 py-2 bg-[#827B7E] rounded-lg hover:bg-[#322F30]"
									onClick={() => history.push("/login")}
								>
									Pilih
								</button>
							</div>
						)}
					</div>
					<section className="mt-4">
						<p className="text-base font-normal mb-4">{props.description}</p>
						<div className="space-y-2">
							{props.facilityPackage.length > 0 ? (
								props.facilityPackage.map((facilities) => (
									<div className="flex flex-row items-center gap-x-4">
										<BsCheck className="text-green-500" />
										<p className="text-sm font-normal">
											{facilities.facility.name}
										</p>
									</div>
								))
							) : (
								<div className="flex flex-row items-center gap-x-4"></div>
							)}
						</div>
					</section>
				</div>
			) : (
				<div className="h-full p-8 rounded-xl bg-white drop-shadow-lg mt-4">
					<h5 className="text-xl font-medium mb-4">{props.name}</h5>
					<div className="text-center">
						{props.amount === 0 ? (
							<h5 className="text-3xl font-extrabold">Gratis</h5>
						) : (
							<h5 className="text-3xl font-extrabold">
								{numberFormat(props.amount)}
							</h5>
						)}
						{token ? (
							<div>
								{props.amount === 0 ? (
									<button
										className="w-40 text-center text-white mt-4 py-2 bg-[#827B7E] rounded-lg"
										disabled
									>
										Tidak Dapat Dipilih
									</button>
								) : (
									<div>
										{currentPackage === 0 ||
										currentPackage.status === "STOPPED" ? (
											<button
												className="w-40 text-center text-white mt-4 py-2 bg-[#827B7E] rounded-lg hover:bg-[#322F30]"
												onClick={() => BuyPackage(props.id)}
												disabled={checking}
											>
												{loading
													? "Loading..."
													: checking
													? "Loading"
													: "Pilih"}
											</button>
										) : (
											<button
												className="w-40 text-center text-white mt-4 py-2 bg-[#827B7E] rounded-lg hover:bg-[#322F30]"
												onClick={() => ChangePackage(props.id)}
												disabled={checking}
											>
												{loading
													? "Loading..."
													: checking
													? "Loading"
													: "Ganti"}
											</button>
										)}
									</div>
								)}
							</div>
						) : (
							<div>
								<button
									className="w-40 text-center text-white mt-4 py-2 bg-[#827B7E] rounded-lg hover:bg-[#322F30]"
									onClick={() => history.push("/login")}
								>
									Pilih
								</button>
							</div>
						)}
					</div>
					<section className="mt-4">
						<p className="text-base font-normal mb-4">{props.description}</p>
						<div className="space-y-2">
							{props.facilityPackage.length > 0 ? (
								props.facilityPackage.map((facilities) => (
									<div className="flex flex-row items-center gap-x-4">
										<BsCheck className="text-green-500" />
										<p className="text-sm font-normal">
											{facilities.facility.name}
										</p>
									</div>
								))
							) : (
								<div className="flex flex-row items-center gap-x-4"></div>
							)}
						</div>
					</section>
				</div>
			)}
		</div>
	);
}

export default CardPrice;
