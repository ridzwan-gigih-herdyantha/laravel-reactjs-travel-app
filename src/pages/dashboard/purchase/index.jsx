import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Dashboard";
import { Api } from "../../../api/index";
import {
	SkeletonCurrentPackage,
	SkeletonHistoryPayment,
} from "../../../components/utilities/skeleton";
import PaginationComponent from "../../../components/utilities/Pagination";
import moment from "moment";
import Cookies from "js-cookie";

function Purchase() {
	//title page
	document.title = "Traveling | Riwayat Pembayaran";

	//state tours
	const token = Cookies.get("token");
	const [currentPackage, setCurrentPackage] = useState([]);
	const [purchaseHistory, setPurchaseHistory] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(0);
	const [total, setTotal] = useState(0);

	const fetchDataCurrentPackage = async () => {
		//define page variable
		await Api.get(`/current-package`, {
			headers: {
				//header Bearer + Token
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				setLoading(true);
				setCurrentPackage(response.data.data);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	//function "fetchDataMyFavorite"
	const fetchDataPurchaseHistory = async (pageNumber) => {
		//define page variable
		const page = pageNumber ? pageNumber : currentPage;
		setPerPage(page);
		await Api.get(`/history-payment?page=${page}`, {
			headers: {
				//header Bearer + Token
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				setLoading(true);
				setPurchaseHistory(response.data.data.data);
				setCurrentPage(response.data.data.current_page);
				setPerPage(response.data.data.per_page);
				setTotal(response.data.data.total);
			})
			.catch((error) => {
				setPurchaseHistory(0);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const numberFormat = (value) =>
		new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(value);

		const scrollToTop = () => {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		};

	//hook
	useEffect(() => {
		scrollToTop();
		fetchDataCurrentPackage();
		fetchDataPurchaseHistory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<React.Fragment>
			<LayoutAdmin>
				<div className="flex flex-col gap-y-2">
					<h5 className="text-lg font-semibold">Paket saat ini</h5>
					<div className="rounded-lg bg-white border w-auto h-auto p-4">
						<div className="flex flex-col">
							{loading && <SkeletonCurrentPackage />}
							{currentPackage && currentPackage.status === "ACTIVE" ? (
								<div className="gap-y-2">
									{currentPackage.expired_date !== null ? (
										<div>
											<h5 className="text-3xl font-semibold mb-4">
												{currentPackage.name_package}
											</h5>
											<p>Status &nbsp; : &nbsp; {currentPackage.status}</p>
											<p className="mb-4">
												Payment ID &nbsp; : &nbsp; {currentPackage.payment_id}
											</p>
											<p>
												Mulai Langganan &nbsp; : &nbsp;{" "}
												{moment(currentPackage.start_date).format("DD-MM-Y")}
											</p>
											<p>
												Kadaluarsa &nbsp; : &nbsp;
												{moment(currentPackage.expired_date).format("DD-MM-Y")}
											</p>
										</div>
									) : (
										<div>
											<h5 className="text-3xl font-semibold mb-4">
												{currentPackage.name_package}
											</h5>
											<p>Status &nbsp; : &nbsp; Belum Dibayar</p>
											<p className="mb-4">
												Payment ID &nbsp; : &nbsp; {currentPackage.payment_id}
											</p>
											<a
												href={currentPackage.last_created_invoice_url}
												className="mt-4 bg-yellow-500 px-4 py-2 rounded-md text-white"
											>
												Bayar Sekarang
											</a>
										</div>
									)}
								</div>
							) : (
								<div hidden={loading}>
									<p className="mb-4">Anda belum memiliki paket</p>
									<a
										href="/pricing"
										className="mt-4 bg-[#827B7E] rounded-lg hover:bg-[#322F30] px-4 py-2 rounded-md text-white"
									>
										Pilih Paket
									</a>
								</div>
							)}
						</div>
					</div>
					<section className="flex flex-col gap-y-2 mt-2">
						<h5 className="text-2xl font-semibold">Riwayat Pembayaran</h5>
						<p className="text-base font-normal text-gray-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
						</p>
					</section>
					<section className="relative w-[25rem] lg:w-full overflow-x-scroll lg:overflow-x-auto sm:rounded-lg">
						<table className="w-full text-sm text-left text-gray-800">
							<thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 border-b">
								<tr>
									<th scope="col" className="px-6 py-3">
										Dibayar pada
									</th>
									<th scope="col" className="px-6 py-3">
										Nama Paket
									</th>
									<th scope="col" className="px-6 py-3">
										Status
									</th>
									<th scope="col" className="px-6 py-3">
										Mata Uang
									</th>
									<th scope="col" className="px-6 py-3">
										Amount
									</th>
								</tr>
							</thead>
							<tbody>
								{purchaseHistory ? (
									purchaseHistory.map((history) => (
										<tr className="text-center" key={history.id}>
											<th
												scope="row"
												className="px-6 py-4 font-medium text-black"
											>
												{moment(history.paid_at).format("DD-MM-Y")}
											</th>
											<td className="px-6 py-4">{history.description}</td>
											{history.status === "PAID" ? (
												<td className="px-6 py-4 text-green-500 font-semibold">
													{history.status}
												</td>
											) : (
												<td className="px-6 py-4 text-red-500 font-semibold">
													{history.status}
												</td>
											)}
											<td className="px-6 py-4">{history.currency}</td>
											<td className="px-6 py-4 text-right">
												{history.currency === "IDR"
													? numberFormat(history.amount)
													: history.amount}
											</td>
										</tr>
									))
								) : (
									<tr>
										<th
											scope="row"
											className="px-6 py-4 font-medium text-black"
										>
											Data Belum Tersedia...
										</th>
									</tr>
								)}
							</tbody>
						</table>
						{loading && <SkeletonHistoryPayment />}
						{purchaseHistory ? (
							<PaginationComponent
								currentPage={currentPage}
								perPage={perPage}
								total={total}
								onChange={(pageNumber) => fetchDataPurchaseHistory(pageNumber)}
								position="end"
							/>
						) : (
							<div></div>
						)}
					</section>
				</div>
			</LayoutAdmin>
		</React.Fragment>
	);
}

export default Purchase;
