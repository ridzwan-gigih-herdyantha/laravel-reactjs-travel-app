//import layout
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
//import layout web
import LayoutWeb from "../../../layouts/Web";
import { IlluOne, IlluTwo, IlluThree } from "../../../assets/index";
import { Api, ApiImg } from "../../../api";
import {
	CardCity,
	CardEducation,
} from "../../../components/utilities/home/CardHome";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/bundle";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { SkeletonHome } from "../../../components/utilities/skeleton";
import { SearchAll } from "../../../components/utilities/home/SearchAll";

function Home() {
	document.title = "Traveling | Home";
	const [sliderimages, setSliderImages] = useState([]);
	const [disedus, setDisEdus] = useState([]);
	const [discities, setDisCities] = useState([]);
	const [loading, setLoading] = useState(true);
	const [hideNullData, setHideNullData] = useState(true);

	const fetchSliderImages = async () => {
		await Api.get("/slider").then((response) => {
			setSliderImages(response.data.data);
		});
	};

	const fetchDataCities = async () => {
		await Api.get("/discover/city")
			.then((response) => {
				setDisCities(response.data.data);
			})
			.finally(() => {
				setLoading(false);
				setHideNullData(false);
			});
	};

	const fetchDataEdus = async () => {
		await Api.get("/discover/education")
			.then((response) => {
				setDisEdus(response.data.data);
			})
			.finally(() => {
				setLoading(false);
				setHideNullData(false);
			});
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	//hook
	useEffect(() => {
		scrollToTop();
		fetchSliderImages();
		fetchDataCities();
		fetchDataEdus();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<React.Fragment>
			<LayoutWeb>
				{loading && <SkeletonHome />}
				{
					<div hidden={hideNullData}>
						<p className="absolute text-white mt-24">Absolute</p>
						<Swiper
							modules={[EffectFade, Autoplay, Navigation, Pagination]}
							navigation={false}
							pagination={{
								type: "bullets",
								clickable: true,
							}}
							speed={1500}
							slidesPerView={1}
							loop={true}
							autoplay={{
								delay: 8000,
								disableOnInteraction: false,
							}}
							className="h-[40vh] mx-auto w-auto lg:h-[70vh] w-[100%]"
						>
							{sliderimages.map((sliderimage) => (
								<SwiperSlide
									key={sliderimage.id}
									className="h-[40vh] mx-auto lg:h-[70vh] w-[100%]"
								>
									<img
										alt="placeholder"
										className="h-[40vh] lg:h-[70vh] w-[100%] mx-auto"
										src={ApiImg + "/" + sliderimage.image}
									/>
								</SwiperSlide>
							))}
						</Swiper>

						<SearchAll />
						{/* Kunjungi Kota Favoritmu */}
						<section className="px-12 md:px-24 mt-10">
							<div className="flex justify-between items-center mb-5">
								<div>
									<h1 className="text-lg md:text-xl font-bold">
										Kunjungi Kota Favoritmu
									</h1>
									<div className="bg-[#229396] w-16 h-2 mt-1"></div>
								</div>
								<Link to="/wisata">
									<button className="text-sm font-normal text-gray-500">
										Show More
									</button>
								</Link>
							</div>
							<div className="grid grid-cols-1 gap-y-4 md:gap-y-0 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
								{discities ? (
									discities.length > 0 &&
									discities.map((discity) => (
										<CardCity
											key={discity.id}
											id={discity.id}
											name={discity.name}
											path_image={discity.path_image}
											position={discity.country}
										/>
									))
								) : (
									<div>yes</div>
								)}
							</div>
						</section>
						{/* Temukan Edukasi Kesukaanmu */}
						<section className="px-12 md:px-24 mt-10">
							<div className="flex justify-between items-center mb-5">
								<div>
								<h1 className="text-lg md:text-xl font-semibold">
									Temukan Edukasi Kesukaanmu
								</h1>
								<div className="bg-[#229396] w-16 h-2 mt-1"></div>
								</div>
								<Link to="/edukasi">
									<button className="text-sm font-normal text-gray-500">
										Show More
									</button>
								</Link>
							</div>
							<div className="grid grid-cols-1 gap-y-4 md:gap-y-0 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
								{disedus ? (
									disedus.length > 0 &&
									disedus.map((disedu) => (
										<CardEducation
											key={disedu.id}
											id={disedu.id}
											name={disedu.title}
											path_image={disedu.featured_image}
											position={disedu.city}
											link={disedu.slug}
										/>
									))
								) : (
									<div>yes</div>
								)}
							</div>
						</section>

						<section className="mt-20">
							<h1 className="text-center font-bold text-lg md:text-xl">
								Kenapa harus kami?
							</h1>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-12 mx-auto md:px-24 gap-y-4 md:gap-y-0 md:gap-x-4">
								<div className="flex flex-col">
									<img
										alt="illustration"
										src={IlluOne}
										className="w-60 h-60 mx-auto"
									/>
									<div className="text-center">
										<h3 className="font-bold text-[20px]">Lorem ipsum</h3>
										<p className="mx-auto text-center w-52 text-base font-normal text-gray-500">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										</p>
									</div>
								</div>
								<div className="flex flex-col">
									<img
										alt="illustration"
										src={IlluTwo}
										className="w-60 h-60 mx-auto"
									/>
									<div className="text-center">
										<h3 className="font-bold text-[20px]">Lorem ipsum</h3>
										<p className="mx-auto text-center w-52 text-base font-normal text-gray-500">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										</p>
									</div>
								</div>
								<div className="flex flex-col">
									<img
										alt="illustration"
										src={IlluThree}
										className="w-60 h-60 mx-auto"
									/>
									<div className="text-center">
										<h3 className="font-bold text-[20px]">Lorem ipsum</h3>
										<p className="mx-auto text-center w-52 text-base font-normal text-gray-500">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										</p>
									</div>
								</div>
							</div>
						</section>
					</div>
				}
			</LayoutWeb>
		</React.Fragment>
	);
}

export default Home;
