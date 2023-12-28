import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import LayoutWeb from "../../../layouts/Web";
import { Api, ApiImg, LinkUrl } from "../../../api/index";
import Cookies from "js-cookie";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {
	BsCheckSquare,
	BsGlobe,
	BsInfoCircle,
	BsFacebook,
	BsInstagram,
	BsTelephone,
	BsClock,
} from "react-icons/bs";
import { RWebShare } from "react-web-share";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { AiTwotoneStar, AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
// import { MapPlaceholder } from "../../../assets/index";
import RecCard from "../../../components/utilities/education/recCard";
import ReviewCard from "../../../components/utilities/education/reviewCard";
import {
	SkeletonDetail,
	SkeletonRecommendation,
} from "../../../components/utilities/skeleton";
import { toast } from "react-hot-toast";
import ReviewUserCard from "../../../components/utilities/education/reviewUserCard";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";

function WebPlaceShow() {
	const token = Cookies.get("token");
	// const userId = parseInt(Cookies.get("user_id"));
	const userName = Cookies.get("user_name");
	const [education, setEducation] = useState({});
	const [loading, setLoading] = useState(true);
	const [loadingReview, setLoadingReview] = useState(false);
	const [hideNullData, setHideNullData] = useState(true);
	const [hide, setHide] = useState(true);
	const [educationRecommend, setEducationRecommend] = useState({});
	const [favorite, setFavorite] = useState(false);
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState("");
	const [reviews, setReviews] = useState({});
	const [reviewStatus, setReviewStatus] = useState(false);
	const [editReview, setEditReview] = useState(true);
	const [reviewUser, setReviewUser] = useState({});
	const [notLoggedIn, setNotLoggedIn] = useState(false);
	const [notYetPaid, setNotYetPaid] = useState(false);
	const history = useHistory();
	//state validation
	const [validation, setValidation] = useState({});
	//slug params
	const { slug } = useParams();

	//function "fetchDataEducation" ========================================
	const fetchDataEducation = async () => {
		//fetching Rest API
		const url = token ? "education-auth" : "education";
		await Api.get(`/${url}/${slug}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				setLoading(true);
				setHideNullData(true);
				setEducation(response.data.data);
				setEducationRecommend(response.data.recomendation);
				setReviews(response.data.review);
				setFavorite(response.data.favorite);
				setReviewStatus(response.data.review_user_status);
				setReviewUser(response.data.review_user);
				setNotLoggedIn(response.data.not_logged_in);
				setNotYetPaid(response.data.not_yet_paid);
				//set title from state "category"
				document.title = `${response.data.data.title} - Traveling`;

				setLoading(false);
				setHideNullData(false);
				setHide(false);
			})
			.catch((error) => {
				//set error response validasi to state "validation"
				setValidation(error.response.data);
				Swal.fire({
					confirmButtonColor: "#827B7E",
					title: "Halaman tidak Ditemukan!",
					confirmButtonText: "Kembali ke Home",
					icon: "error",
				}).then(() => {
					window.location.replace("/");
				});
				setHide(true);
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
		fetchDataEducation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// RATING ===========================================
	const ratingChanged = (rating) => {
		setRating(rating);
	};

	const showEditForm = () => {
		setEditReview(false);
		setReview(reviewUser.review);
	};

	const closeEditForm = (e) => {
		e.preventDefault();
		setEditReview(true);
	};

	const PostReview = async (e) => {
		setLoadingReview(true);
		e.preventDefault();
		// setRating(null);
		// setLoading(false);
		await Api.post(
			"/review",
			{
				id: education.id,
				review: review,
				rating: rating,
			},
			{
				headers: {
					//header Bearer + Token
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((response) => {
				toast.success(
					"Review Posted!",
					{
						duration: 4000,
						position: "top-right",
						className: "toast",
						style: {
							background: "#333",
							color: "#fff",
						},
					},
					fetchDataEducation(),
					setLoadingReview(false)
				);
				setTimeout(function () {
					window.location.reload(1);
				}, 2000);
			})
			.catch((error) => {
				//set state isLoading to "false"
				setLoadingReview(false);
				//set error response validasi to state "validation"
				setValidation(error.response.data);
			});
	};

	const removeReview = async (e) => {
		await Api.post(
			"/delete-review",
			{
				tour_id: e,
			},
			{
				headers: {
					//header Bearer + Token
					Authorization: `Bearer ${token}`,
				},
			}
		).then((response) => {
			toast.success("Review has been Removed!", {
				duration: 4000,
				position: "top-right",
				className: "toast",
				style: {
					background: "#333",
					color: "#fff",
				},
			});
		});
		setTimeout(function () {
			window.location.reload(1);
		}, 2000);
	};

	const EditReview = async (e) => {
		setLoadingReview(true);
		e.preventDefault();
		// setRating(null);
		// setLoading(false);
		await Api.post(
			`/update-review`,
			{
				tour_id: education.id,
				review: review,
				rating: rating,
			},
			{
				headers: {
					//header Bearer + Token
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((response) => {
				toast.success(
					"Review Updated!",
					{
						duration: 4000,
						position: "top-right",
						className: "toast",
						style: {
							background: "#333",
							color: "#fff",
						},
					},
					fetchDataEducation(),
					ratingChanged(null),
					setLoadingReview(false)
				);
				setTimeout(function () {
					window.location.reload(1);
				}, 2000);
			})
			.catch((error) => {
				//set state isLoading to "false"
				setLoadingReview(false);
				//set error response validasi to state "validation"
				setValidation(error.response.data);
			});
	};

	//=================================================================
	// favorite & react image gallery
	//=================================================================
	const createFavorite = async (e) => {
		await Api.post(
			"/favorite",
			{
				favorite_id: e,
			},
			{
				headers: {
					//header Bearer + Token
					Authorization: `Bearer ${token}`,
				},
			}
		).then((response) => {
			toast.success("Save Favorite Successfully.", {
				duration: 4000,
				position: "top-right",
				className: "toast",
				style: {
					background: "#333",
					color: "#fff",
				},
			});

			fetchDataEducation();
		});
	};

	const removeFavorite = async (e) => {
		await Api.post(
			"/un-favorite",
			{
				favorite_id: e,
			},
			{
				headers: {
					//header Bearer + Token
					Authorization: `Bearer ${token}`,
				},
			}
		).then((response) => {
			toast.success("Favorite Removed.", {
				duration: 4000,
				position: "top-right",
				className: "toast",
				style: {
					background: "#333",
					color: "#fff",
				},
			});
			fetchDataEducation();
		});
	};
	//define image array
	const imagesGallery = [];
	//function "placeImages"
	const educationImages = () => {
		//loop data from object "educations"
		imagesGallery.push({
			original: ApiImg + "/" + education.featured_image,
			thumbnail: ApiImg + "/" + education.featured_image,
		});
		for (let value in education.image) {
			//push to image array
			imagesGallery.push({
				original: ApiImg + "/" + education.image[value].file_name,
				thumbnail: ApiImg + "/" + education.image[value].file_name,
			});
		}
	};
	//hook
	useEffect(() => {
		//call function "placeImage"
		educationImages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	});

	return (
		<React.Fragment>
			<LayoutWeb>
				{loading && <SkeletonDetail />}
				{
					<div hidden={hide}>
						<section className="px-6 md:px-44 lg:px-64 flex flex-row items-center justify-between mt-10">
							<div className="flex flex-col gap-y-2">
								<div className="flex flex-row items-center">
									<h5 className="text-xl md:text-3xl my-2 font-medium text-gray-500">
										{education.title}
									</h5>
									{parseInt(education.premium) === 1 && (
										<span className="ml-2 p-1 w-auto h-6 rounded-lg gap-x-1 bg-amber-500">
											<p className="text-white text-xs">PREMIUM</p>
										</span>
									)}
									{parseInt(education.featured) === 1 && (
										<span className="ml-2 p-1 w-auto h-6 rounded-lg gap-x-1 bg-blue-500">
											<p className="text-white text-xs">UNGGULAN</p>
										</span>
									)}
								</div>
								{/* spacer */}
								<div
									className={
										parseInt(education.premium) === 1 && notLoggedIn
											? "blur"
											: !notLoggedIn && notYetPaid
											? "blur"
											: ""
									}
								>
									<div className="flex gap-x-1 md:gap-x-2 items-center">
										<section className="flex items-center p-2 rounded-lg w-14 gap-x-1 bg-amber-500">
											<p className="text-white text-sm">{education.rating}</p>
											<AiTwotoneStar className="text-white w-3 h-3" />
										</section>
										<p className="text-sm text-gray-500">{education.address}</p>
									</div>
								</div>
								{/* spacer */}
							</div>
							{/* spacer */}
							<section className="flex gap-x-1 items-center">
								{/* <FavoriteButton/> */}
								{token ? (
									<div>
										{favorite === false ? (
											<div>
												<button
													className="px-2 py-2 bg-gray-300 rounded-lg"
													onClick={() => createFavorite(education.id)}
												>
													<AiOutlineHeart />
												</button>
											</div>
										) : (
											<div>
												<button
													className="px-2 py-2 bg-gray-300 rounded-lg"
													onClick={() => removeFavorite(education.id)}
												>
													<MdFavorite className="text-red-500" />
												</button>
											</div>
										)}
									</div>
								) : (
									<div>
										<button
											className="px-2 py-2 bg-gray-300 rounded-lg"
											onClick={() => history.push("/login")}
										>
											<AiOutlineHeart />
										</button>
									</div>
								)}
								<RWebShare
									data={{
										text: "test",
										url: LinkUrl + "/edukasi/" + education.slug,
										title: `${education.title}`,
										sites: [],
									}}
									onClick={() => console.log("success!")}
								>
									<button className="px-2 py-2 bg-gray-300 rounded-lg">
										<FiShare2 />
									</button>
								</RWebShare>
							</section>
						</section>
						{/*Slider */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<div className="w-[100vw] px-6 md:w-[50rem] mt-4">
								<ImageGallery items={imagesGallery} autoPlay={true} />
							</div>
						</div>
						<hr className="w-2/3 mx-auto" />

						{/*Deskripsi*/}
						<section className="px-6 md:px-44 lg:px-64 my-8">
							<h1 className="font-semibold text-lg mb-2 text-gray-500">Deskripsi</h1>
							<div
								dangerouslySetInnerHTML={{ __html: education["content"] }}
							></div>
						</section>
						<hr className="w-2/3 mx-auto" />

						{/*Details*/}
						<div
							className={
								parseInt(education.premium) === 1 && notLoggedIn
									? "blur"
									: !notLoggedIn && notYetPaid
									? "blur"
									: ""
							}
						>
							<section className="px-6 md:px-44 lg:px-64 flex flex-col-reverse md:flex-row justify-between items-start my-10">
								<div className="flex flex-col space-y-3 items-start">
									<h1 className="font-semibold text-lg text-gray-500">Detail</h1>
									<p className="flex flex-row gap-x-2 items-center text-sm text-gray-500">
										<BsTelephone />
										{education.phone_number != null
											? education.phone_number
											: "-"}
									</p>
									<p className="flex flex-row gap-x-2 items-center text-sm text-gray-500">
										<BsGlobe />
										{education.website != null ? education.website : "-"}
									</p>
									<p className="flex flex-row gap-x-2 items-center text-sm text-gray-500">
										<BsFacebook />
										{education.facebook != null ? education.facebook : "-"}
									</p>
									<p className="flex flex-row gap-x-2 items-center text-sm text-gray-500">
										<BsInstagram />
										{education.instagram != null ? education.instagram : "-"}
									</p>
									<p className="flex flex-row gap-x-2 items-center text-sm text-gray-500">
										<BsInfoCircle />
										{education.address}
									</p>
									<p className="flex flex-row gap-x-2 items-center text-sm text-gray-500">
										<BsClock />
										{education.operational_hour}
									</p>
								</div>

								<div className="w-full md:ml-1 mb-4 lg:w-1/2">
									<h1 className="font-semibold text-lg mb-4 text-gray-500">Harga</h1>
									<div className="shadow-xl w-full lg:w-1/2 bg-amber-300 rounded-xl p-5">
										<div className="mb-2">
											<p className="text-center font-medium">
												Rp {education.price}
											</p>
										</div>
									</div>
								</div>
							</section>
						</div>
						<hr className="w-2/3 mx-auto" />

						{/*Fasilitas*/}
						<div
							className={
								parseInt(education.premium) === 1 && notLoggedIn
									? "blur"
									: !notLoggedIn && notYetPaid
									? "blur"
									: ""
							}
						>
							<section className="px-6 md:px-44 lg:px-64 my-8">
								<h1 className="font-semibold text-lg mb-2 text-gray-500">Fasilitas</h1>
								<div className="inline-flex space-x-10 text-gray-500">
									<ul className="flex flex-col">
										{education.tour_attribute?.length > 0 ? (
											education.tour_attribute.map((facilities) => (
												<p className="flex flex-row gap-x-2 items-center text-md">
													<BsCheckSquare key={facilities.id} />
													{facilities.attribute.name}
												</p>
											))
										) : (
											<div hidden={hideNullData}>
												<strong>Belum Ada Fasilitas Tertentu</strong>
											</div>
										)}
									</ul>
								</div>
							</section>
						</div>
						<hr className="w-2/3 mx-auto" />

						{/*Map*/}
						<div
							className={
								parseInt(education.premium) === 1 && notLoggedIn
									? "blur"
									: !notLoggedIn && notYetPaid
									? "blur"
									: ""
							}
						>
							<section className="px-6 md:px-44 lg:px-64 my-8">
								<h1 className="font-semibold text-lg my-5 text-gray-500">Detail Lokasi</h1>
								<div className="mx-auto md:w-[800px] md:h-[600px] w-[90vw] h-[50vh]">
									<iframe
										title="education map"
										className="md:w-[800px] md:h-[600px] w-[90vw] h-[50vh]"
										src={education.url_map}
										width=""
										height="300"
										style={{ border: 0 }}
										allowFullScreen=""
										aria-hidden="true"
										tabIndex="0"
									></iframe>
								</div>
							</section>
						</div>
						<hr className="w-2/3 mx-auto" />

						{/*Ulasan*/}
						<section className="px-3 md:px-64 my-4">
							{token && (
								<div
									className={
										parseInt(education.premium) === 1 && notLoggedIn
											? "hidden"
											: !notLoggedIn && notYetPaid
											? "hidden"
											: ""
									}
								>
									{reviewStatus === false ? (
										<div>
											<div className="inline-flex items-center mb-4">
												<h3 className="text-lg font-semibold text-gray-500">Kirim Ulasan</h3>
											</div>
											<form className="mb-16" onSubmit={PostReview}>
												<div>
													<ReactStars
														classNames="mb-3"
														count={5}
														onChange={ratingChanged}
														size={30}
														activeColor="#ffd700"
													/>
													{validation.rating && (
														<div className="text-red-500">
															{validation.rating[0]}
														</div>
													)}
													<textarea
														value={review}
														onChange={(e) => setReview(e.target.value)}
														type="text"
														placeholder="Masukkan ulasan disini"
														className="w-[600px] pt-1 h-20 border rounded-xl border-black outline-none px-4"
													></textarea>
													{validation.review && (
														<div className="text-red-500">
															{validation.review[0]}
														</div>
													)}
													<div>
														<button className="mt-2 bg-black rounded-lg text-white font-bold px-3 py-2">
															{loadingReview ? "Loading..." : "kirim"}
														</button>
													</div>
												</div>
											</form>
										</div>
									) : (
										<div>
											<div hidden={editReview}>
												<div className="inline-flex items-center mb-4">
													<h3 className="text-lg font-semibold text-gray-500">Edit Ulasan</h3>
												</div>
												<form className="mb-16" onSubmit={EditReview}>
													<div>
														<ReactStars
															classNames="mb-3"
															count={5}
															onChange={ratingChanged}
															size={30}
															activeColor="#ffd700"
														/>
														{validation.rating && (
															<div className="text-red-500">
																{validation.rating[0]}
															</div>
														)}
														<textarea
															onChange={(e) => setReview(e.target.value)}
															type="text"
															placeholder="Masukkan ulasan disini"
															className="w-[600px] pt-1 h-20 border rounded-xl border-black outline-none px-4"
															value={review}
														></textarea>
														{validation.review && (
															<div className="text-red-500">
																{validation.review[0]}
															</div>
														)}
														<div>
															<button className="mt-2 bg-black rounded-lg text-white font-bold px-3 py-2">
																{loadingReview ? "Loading..." : "kirim"}
															</button>
															<button
																className="mt-2 ml-3 bg-red-500 rounded-lg text-white font-bold px-3 py-2"
																onClick={closeEditForm}
																disabled={loadingReview}
															>
																Batal
															</button>
														</div>
													</div>
												</form>
											</div>
											<div className="inline-flex items-center mb-4">
												<h3 className="text-lg font-semibold text-gray-500">Ulasan Anda</h3>
											</div>
											<ReviewUserCard
												key={reviewUser.id}
												education_id={education.id}
												review={reviewUser.review}
												rating={reviewUser.rating}
												username={userName}
												createdAt={reviewUser.created_at}
												fetchDataEducation={fetchDataEducation}
											/>
											<div>
												<button
													className="mr-3 ml-3 text-gray-400 hover:text-black"
													onClick={showEditForm}
												>
													Edit
												</button>
												|
												<button
													className="mr-3 ml-3 text-gray-400 hover:text-red-500"
													onClick={() => removeReview(education.id)}
												>
													Delete
												</button>
											</div>
										</div>
									)}
								</div>
							)}
						</section>

						{/*Review*/}
						<div
							className={
								parseInt(education.premium) === 1 && notLoggedIn
									? "blur"
									: !notLoggedIn && notYetPaid
									? "blur"
									: ""
							}
						>
							<section className="px-6 md:px-44 lg:px-64 my-8">
								<h1 className="font-semibold text-lg my-5 text-gray-500">Semua Ulasan</h1>
								<div className="flex flex-col gap-8">
									{reviews.length > 0 ? (
										reviews.map((review) => (
											<div className="col-start-1 md:col-start-1 lg:col-start-1">
												<ReviewCard
													key={review.id}
													id={review.id}
													review={review.review}
													rating={review.rating}
													username={review.user.name}
													createdAt={review.created_at}
												/>
											</div>
										))
									) : (
										<div hidden={hideNullData}>
											<strong>Belum Ada Review</strong>
										</div>
									)}
								</div>
							</section>
						</div>
						<hr className="w-2/3 mx-auto" />

						{/*Rekomendasi Lain*/}
						<section className="px-6 md:px-44 lg:px-64 my-8">
							<h1 className="font-semibold text-lg my-5 text-gray-500">Rekomendasi Lain</h1>
							<div class="flex flex-col md:flex-row md:gap-x-2">
								{loading && <SkeletonRecommendation />}
								{educationRecommend.length > 0 ? (
									educationRecommend
										.slice(0, 4)
										.map((recommend) => (
											<RecCard
												key={recommend.id}
												id={recommend.id}
												slug={recommend.slug}
												title={recommend.title}
												featured_image={recommend.featured_image}
												featured={parseInt(recommend.featured)}
												premium={parseInt(recommend.premium)}
												city={recommend.city.name}
												rating={recommend.rating}
												review_count={recommend.review_count}
											/>
										))
								) : (
									<div hidden={hideNullData}>
										<strong>Belum Ada Rekomendasi Terkait</strong>
									</div>
								)}
							</div>
						</section>
					</div>
				}
			</LayoutWeb>
		</React.Fragment>
	);
}

export default WebPlaceShow;
