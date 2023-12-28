import React, { useEffect, useState } from "react";
import LayoutWeb from "../../layouts/Web";
import Cookies from "js-cookie";
import { Api } from "../../api/index";
import { SkeletonPricing } from "../../components/utilities/skeleton";
import CardPrice from "../../components/utilities/pricing/CardPrice";

function Pricing() {
	//title page
	document.title = "Traveling | Pricing";

	//state tours
	const token = Cookies.get("token");
	const [priceList, setPriceList] = useState([]);
	const [loading, setLoading] = useState(true);

	//function "fetchDataTour"
	const getPriceList = async () => {
		await Api.get(`/package`)
			.then((response) => {
				setLoading(true);
				setPriceList(response.data.data);	
			})
			.catch((error) => {
				setPriceList(0);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	
	const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

	//hook
	useEffect(() => {
		scrollToTop();
		getPriceList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<LayoutWeb>
			<div className="bg-[#f9fafb] w-full h-64 my-4 md:h-28 px-12 md:px-24 space-y-5">
				<section className="translate-y-6 flex flex-col gap-y-1">
					<h5 className="text-2xl font-extrabold text-black mt-3">Harga Paket</h5>
					<p className="text-base font-normal text-[#8888]">
						Pilih paket dibawah ini
					</p>
				</section>
			</div>
			<section className="grid grid-cols-1 md:grid-cols-3 gap-x-4 px-12 md:px-24 gap-y-4 lg:gap-y-0">
				{loading && <SkeletonPricing />}
				{priceList ? (
					priceList.map((price) => (
						<CardPrice
							key={price.id}
							id={price.id}
							name={price.name}
							description={price.description}
							facilityPackage={price.facility_package}
							amount={parseInt(price.amount)}
							interval={price.interval}
							interval_count={price.interval_count}
							highlighted={parseInt(price.highlighted)}
						/>
					))
				) : (
					<div>
						<p>Data Belum Tersedia.</p>
					</div>
				)}
			</section>
		</LayoutWeb>
	);
}

export default Pricing;
