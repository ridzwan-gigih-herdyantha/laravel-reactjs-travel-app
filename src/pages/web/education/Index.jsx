import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/Web";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import { Api } from "../../../api/index";
import CardEducation from "../../../components/utilities/education/CardEducation";
import PaginationComponent from "../../../components/utilities/Pagination";
import { Skeleton } from "../../../components/utilities/skeleton";
import Cookies from "js-cookie";

function WebEducationsIndex() {
	//title page
	document.title = "Traveling | Edukasi";

	//state educations
	const token = Cookies.get("token");
	const [educations, setEducations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [hideNullData, setHideNullData] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(0);
	const [total, setTotal] = useState(0);

	const ageList = [
		{
			id: "age1",
			ageRange: "0 - 4",
		},
		{
			id: "age2",
			ageRange: "4 - 6",
		},
		{
			id: "age3",
			ageRange: "6 - 12",
		},
		{
			id: "age4",
			ageRange: "12 - 15",
		},
		{
			id: "age5",
			ageRange: "15+",
		},
		{
			id: "age6",
			ageRange: "All Age",
		},
	];
	const priceList = [
		{
			id: "price1",
			priceRange: "0 - 50.000",
		},
		{
			id: "price2",
			priceRange: "50.000 - 150.000",
		},
		{
			id: "price3",
			priceRange: "150.000 - 300.000",
		},
		{
			id: "price4",
			priceRange: "300.000 - 500.000",
		},
		{
			id: "price5",
			priceRange: "500.000+",
		},
	];

	const [countries, setCountries] = useState([]);
	const [provinces, setProvinces] = useState([]);
	const [cities, setCities] = useState([]);
	const [city, setCity] = useState("");
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [age, setAge] = useState("");
	const [price, setPrice] = useState("");

	// Variable Filter
	const [subCategory, setSubCategory] = useState([]);
	const [checkedPrice, setCheckedPrice] = useState(true);
	const [checkedAge, setCheckedAge] = useState(true);

	const getMasterCountry = async () => {
		//fetching Rest API
		await Api.get(`/master-country`).then((response) => {
			setCountries(response.data.data);
		});
	};

	const getMasterProvince = async () => {
		//fetching Rest API
		await Api.get(`/master-province`).then((response) => {
			setProvinces(response.data.data);
		});
	};

	const getMasterCity = async () => {
		//fetching Rest API
		await Api.get(`/master-city`).then((response) => {
			setCities(response.data.data);
		});
	};

	const getCategory = async () => {
		setLoading(true);
		setHideNullData(true);
		await Api.get(`/master-category-education`).then((response) => {
			setCategories(response.data.data);
			// console.log(response.data.data);
		});
	};

	const getSubCategory = async () => {
		setLoading(true);
		setHideNullData(true);
		await Api.get(`/master-subcategory-education`).then((response) => {
			setSubCategories(response.data.data);
			// console.log(response.data.data);
		});
	};

	// Handle Filter City
	const handleChangeCity = (index, item) => (event) => {
		const newCity = [...city];
		if (city[index] === item.name) {
			newCity[index] = null;
			setCity(newCity);
		} else {
			newCity[index] = item.name;
			setCity(newCity);
		}
		fetchDataEducations(1, newCity, subCategory, age, price);
	};
	// Handle Filter Sub Category
	const handleChangeSubCategory = (index, item) => (event) => {
		const newSubCategory = [...subCategory];
		if (subCategory[index] === item.name) {
			newSubCategory[index] = null;
			setSubCategory(newSubCategory);
		} else {
			newSubCategory[index] = item.name;
			setSubCategory(newSubCategory);
		}
		fetchDataEducations(1, city, newSubCategory, age, price);
	};

	// Handle Filter Age
	const handleChangeAge = (event, index) => {
		if (age === ageList[index].ageRange) {
			setAge("");
			setCheckedAge(false);
			fetchDataEducations(1, city, subCategory, "", price);
		} else {
			setAge(ageList[index].ageRange);
			setCheckedAge(index);
			fetchDataEducations(1, city, subCategory, ageList[index].ageRange, price);
		}
	};

	// Handle Filter Price
	const handleChangePrice = (event, index) => {
		if (price === priceList[index].priceRange) {
			setPrice("");
			setCheckedPrice(false);
			fetchDataEducations(1, city, subCategory, age, "");
		} else {
			setPrice(priceList[index].priceRange);
			setCheckedPrice(index);
			fetchDataEducations(
				1,
				city,
				subCategory,
				age,
				priceList[index].priceRange
			);
		}
	};

	//function "fetchDataEducations"
	const fetchDataEducations = async (
		pageNumber,
		paramsCity,
		paramsSubCategory,
		paramsAge,
		paramsPrice
	) => {
		const page = pageNumber ? pageNumber : currentPage;
		setPerPage(page);
		const filteredCity = paramsCity ? paramsCity : city;
		const filteredSubCategory = paramsSubCategory
			? paramsSubCategory
			: subCategory;
		const filteredAge = paramsAge ? paramsAge : "";
		const filteredPrice = paramsPrice ? paramsPrice : "";
		// console.log(paramsSubCategory)

		if (filteredCity) {
			var txtCity = "";
			for (var xCity in filteredCity) {
				if (filteredCity[xCity] != null) {
					txtCity += filteredCity[xCity] + ",";
				}
			}
			var nCity = txtCity.lastIndexOf(",");
			var aCity = txtCity.substring(0, nCity);
		}
		const searchCity = aCity ? aCity : "";

		if (filteredSubCategory) {
			var txt = "";
			for (var x in filteredSubCategory) {
				if (filteredSubCategory[x] != null) {
					txt += filteredSubCategory[x] + ",";
				}
			}
			var n = txt.lastIndexOf(",");
			var a = txt.substring(0, n);
		}
		const searchSubCategory = a ? a : "";

		const url = token ? "education-auth" : "education";
		await Api.get(
			`/${url}?page=${page}&city=${searchCity}&subcategory=${searchSubCategory}&age=${filteredAge}&price=${filteredPrice}`,
			{
				headers: {
					//header Bearer + Token
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((response) => {
				setLoading(true);
				setHideNullData(true);
				setEducations(response.data.data.data);
				setCurrentPage(response.data.data.current_page);
				setPerPage(response.data.data.per_page);
				setTotal(response.data.data.total);
				scrollToTop();
			})
			.catch((error) => {
				setEducations(0);
			})
			.finally(() => {
				setLoading(false);
				setHideNullData(false);
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
		getMasterCountry();
		getMasterProvince();
		getMasterCity();
		getCategory();
		getSubCategory();
		fetchDataEducations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<React.Fragment>
			<LayoutWeb>
				<div className="mx-auto bg-gray-50 w-full my-8 md:h-16 px-12 md:px-24 h-16 space-y-5">
					<section className="pt-5 text-center md:text-left">
						<p className="text-sm text-black">
							<Link to="/" className="text-black">
								Home
							</Link>{" "}
							/ Education
						</p>
					</section>
				</div>
				<div className="mt-2">
					<div className="flex justify-between sm:mx-auto px-4 md:flex-row lg:px-24 flex-col">
						<section className="md:flex flex-col gap-y-4">
							{/* filter location */}
							<Disclosure>
								{({ open }) => (
									<>
										<Disclosure.Button className="flex justify-between w-48 items-center text-sm font-medium">
											<h3 className="text-lg font-medium text-gray-500">Lokasi</h3>
											<AiFillCaretDown
												className={`${
													open ? "transform rotate-180" : ""
												} w-3 h-3  text-gray-500 mr-2`}
											/>
										</Disclosure.Button>
										<Disclosure.Panel className="text-sm space-y-1  text-gray-500 h-40 overflow-y-scroll">
											<div className="mt-0 flex flex-col w-auto space-y-2 mb-3 mt-3">
												{countries ? (
													countries.map((country) => (
														// COUNTRY
														<Disclosure>
															{({ open }) => (
																<>
																	<Disclosure.Button className="flex justify-between items-center w-40 text-sm font-medium">
																		<span key={country.id}>{country.name}</span>
																		<AiFillCaretDown
																			className={`${
																				open ? "transform rotate-180" : ""
																			} w-3 h-3  text-gray-500 ml-2`}
																		/>
																	</Disclosure.Button>
																	<Disclosure.Panel className="text-sm space-y-1  text-gray-500">
																		<div className="mt-0 flex flex-col w-auto space-y-2 mb-3 mt-3">
																			{provinces ? (
																				provinces
																					.filter(
																						(getCountry) =>
																							parseInt(
																								getCountry.master_countries_id
																							) === country.id
																					)
																					.map((province) => (
																						// PROVINCE
																						<Disclosure>
																							{({ open }) => (
																								<>
																									<Disclosure.Button className="flex justify-between w-40 items-center font-medium text-left">
																										<h3
																											className="text-sm font-medium"
																											key={province.id}
																										>
																											{province.name}
																										</h3>
																										<AiFillCaretDown
																											className={`${
																												open
																													? "transform rotate-180"
																													: ""
																											} w-3 h-3  text-gray-500 mr-2`}
																										/>
																									</Disclosure.Button>
																									<Disclosure.Panel className="text-sm space-y-1 text-black">
																										<div className="mt-0 flex flex-col w-auto space-y-2 mb-3 mt-3">
																											{cities ? (
																												cities
																													.filter(
																														(getProvince) =>
																															parseInt(
																																getProvince.master_provinces_id
																															) === province.id
																													)
																													.map((item, i) => (
																														<label className="inline-flex items-center">
																															<input
																																key={item.id}
																																type="checkbox"
																																value={
																																	item.name
																																}
																																checked={
																																	city[i]
																																}
																																className="w-4 h-4 outline-none border-none bg-[#f1f1f1] rounded-md"
																																onClick={handleChangeCity(
																																	i,
																																	item
																																)}
																															/>
																															<span className="ml-2">
																																{item.name}
																															</span>
																														</label>
																													))
																											) : (
																												<div
																													hidden={hideNullData}
																												>
																													<p>
																														Data Belum Tersedia
																													</p>
																												</div>
																											)}
																										</div>
																									</Disclosure.Panel>
																								</>
																							)}
																						</Disclosure>
																					))
																			) : (
																				<div hidden={hideNullData}>
																					<p>Data Belum Tersedia</p>
																				</div>
																			)}
																		</div>
																	</Disclosure.Panel>
																</>
															)}
														</Disclosure>
													))
												) : (
													<div hidden={hideNullData}>
														<p>Data Belum Tersedia</p>
													</div>
												)}
											</div>
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
							{/* filter sub category */}
							<Disclosure>
								{({ open }) => (
									<>
										<Disclosure.Button className="flex justify-between w-48 items-center text-sm font-medium">
											<h3 className="text-lg font-medium text-gray-500">Kategori</h3>
											<AiFillCaretDown
												className={`${
													open ? "transform rotate-180" : ""
												} w-3 h-3  text-gray-500 mr-2`}
											/>
										</Disclosure.Button>
										<Disclosure.Panel className="text-sm space-y-1  text-gray-500 h-40 overflow-y-scroll">
											<div className="mt-0 flex flex-col w-auto space-y-2 mb-3 mt-3">
												{categories ? (
													categories.map((category) => (
														// PROVINCE
														<Disclosure>
															{({ open }) => (
																<>
																	<Disclosure.Button className="flex justify-between w-40 items-center font-medium text-left">
																		<h3
																			className="text-sm font-medium"
																			key={category.id}
																		>
																			{category.name}
																		</h3>
																		<AiFillCaretDown
																			className={`${
																				open ? "transform rotate-180" : ""
																			} w-3 h-3  text-gray-500 mr-2`}
																		/>
																	</Disclosure.Button>
																	<Disclosure.Panel className="text-sm space-y-1 text-black">
																		<div className="mt-0 flex flex-col w-auto space-y-2 mb-3 mt-3">
																			{subCategories ? (
																				subCategories
																					.filter(
																						(getSubCategory) =>
																							parseInt(
																								getSubCategory.category_id
																							) === category.id
																					)
																					.map((item, i) => (
																						<label className="inline-flex items-center">
																							<input
																								key={item.id}
																								type="checkbox"
																								value={item.name}
																								checked={subCategory[i]}
																								className="w-4 h-4 outline-none border-none bg-[#f1f1f1] rounded-md"
																								onClick={handleChangeSubCategory(
																									i,
																									item
																								)}
																							/>
																							<span className="ml-2">
																								{item.name}
																							</span>
																						</label>
																					))
																			) : (
																				<div hidden={hideNullData}>
																					<p>Data Belum Tersedia</p>
																				</div>
																			)}
																		</div>
																	</Disclosure.Panel>
																</>
															)}
														</Disclosure>
													))
												) : (
													<div hidden={hideNullData}>
														<p>Data Belum Tersedia</p>
													</div>
												)}
											</div>
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
							{/* filter age */}
							<Disclosure>
								{({ open }) => (
									<>
										<Disclosure.Button className="flex justify-between w-48 items-center text-sm font-medium">
											<h3 className="text-lg font-medium text-gray-500">Rentang Usia</h3>
											<AiFillCaretDown
												className={`${
													open ? "transform rotate-180" : ""
												} w-3 h-3  text-gray-500 mr-2`}
											/>
										</Disclosure.Button>
										<Disclosure.Panel className="text-sm space-y-1 text-black h-40 overflow-y-scroll">
											<div className="mt-0 flex flex-col w-auto space-y-2 mb-3 mt-3">
												{ageList.map((age, i) => (
													<label className="inline-flex items-center">
														<input
															key={age.id}
															type="radio"
															value={age.ageRange}
															checked={checkedAge === i}
															className="w-4 h-4 outline-none border-none bg-[#f1f1f1] rounded-md"
															onClick={(event) => handleChangeAge(event, i)}
														/>
														<span className="ml-2">{age.ageRange}</span>
													</label>
												))}
											</div>
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
							{/* filter price */}
							<Disclosure>
								{({ open }) => (
									<>
										<Disclosure.Button className="flex justify-between w-48 items-center text-sm font-medium">
											<h3 className="text-lg font-medium text-gray-500">Rentang Harga</h3>
											<AiFillCaretDown
												className={`${
													open ? "transform rotate-180" : ""
												} w-3 h-3  text-gray-500 mr-2`}
											/>
										</Disclosure.Button>
										<Disclosure.Panel className="text-sm space-y-1 text-black h-40 overflow-y-scroll">
											<div className="mt-0 flex flex-col w-auto space-y-2 mb-3 mt-3">
												{priceList.map((price, i) => (
													<label className="inline-flex items-center">
														<input
															key={price.id}
															type="radio"
															value={price.priceRange}
															checked={checkedPrice === i}
															className="w-4 h-4 outline-none border-none bg-[#f1f1f1] rounded-md"
															onClick={(event) => handleChangePrice(event, i)}
														/>
														<span className="ml-2">{price.priceRange}</span>
													</label>
												))}
											</div>
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
							<div className="invisible"></div>
							<div className="invisible"></div>
						</section>
						{/* list edukasi */}
						<section className="grid grid-cols-1 z-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ml-auto gap-4">
							{loading && <Skeleton />}
							{educations ? (
								educations.map((education) => (
									<CardEducation
										key={education.id}
										id={education.id}
										slug={education.slug}
										title={education.title}
										featured_image={education.featured_image}
										featured={parseInt(education.featured)}
										premium={parseInt(education.premium)}
										city={education.city.name}
										rating={education.rating}
										review_count={education.review_count}
									/>
								))
							) : (
								<div hidden={hideNullData}>
									<p>Data Belum Tersedia.</p>
								</div>
							)}
						</section>
					</div>
					<div>
						{/* pagination */}
						{educations ? (
							<PaginationComponent
								currentPage={currentPage}
								perPage={perPage}
								total={total}
								onChange={(pageNumber) =>
									fetchDataEducations(pageNumber, city, subCategory, age, price)
								}
								position="end"
							/>
						) : (
							<div></div>
						)}
					</div>
				</div>
			</LayoutWeb>
		</React.Fragment>
	);
}

export default WebEducationsIndex;
