import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import LayoutWeb from "../../../layouts/Web";
import { Api, ApiImg, LinkUrl } from "../../../api/index";
// import { Link } from "react-router-dom";
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
import { MdFavorite } from "react-icons/md";
import { FiShare2 } from "react-icons/fi";
// import { MapPlaceholder } from "../../../assets/index";
import RecCard from "../../../components/utilities/tour/recCard";
import ReviewCard from "../../../components/utilities/tour/reviewCard";
import ReviewUserCard from "../../../components/utilities/tour/reviewUserCard";
import { SkeletonRecommendation } from "../../../components/utilities/skeleton";
import { toast } from "react-hot-toast";
import { SkeletonDetail } from "../../../components/utilities/skeleton";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";

function WebPlaceShow() {
	//state tour
	const token = Cookies.get("token");
	// const userId = parseInt(Cookies.get("user_id"));
	const userName = Cookies.get("user_name");
	const [tour, setTour] = useState({});
	const [loading, setLoading] = useState(true);
	const [loadingReview, setLoadingReview] = useState(false);
	const [hideNullData, setHideNullData] = useState(true);
	const [hide, setHide] = useState(true);
	const [tourRecommend, setTourRecommend] = useState({});
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

	//function "fetchDataTour" ========================================
	const fetchDataTour = async () => {
		//fetching Rest API
		const url = token ? "tour-auth" : "tour";
		await Api.get(`/${url}/${slug}`, {
			headers: {
				//header Bearer + Token
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				// console.log(response);
				// process.exit();
				setLoading(true);
				setHideNullData(true);
				setTour(response.data.data);
				setTourRecommend(response.data.recomendation);
				setReviews(response.data.review);
				setReviewStatus(response.data.review_user_status);
				setFavorite(response.data.favorite);
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

	//hook
	useEffect(() => {
		//call function "fetchDataPlace"
		scrollToTop();
		fetchDataTour();
		// eslint-disable-next-line no-console
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
				id: tour.id,
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
				tour_id: tour.id,
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
					fetchDataTour(),
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
	// END RATING ===========================================

	// FAVORITE =============================================
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
			fetchDataTour();
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
			fetchDataTour();
		});
	};
	// END FAVORITE ==================================================

	// IMAGE GALLERY ===============================================
	const imagesGallery = [];
	//function "placeImages"
	const tourImages = () => {
		//loop data from object "tours"
		imagesGallery.push({
			original: ApiImg + "/" + tour.featured_image,
			// fullscreen: fullscreen ,
			// originalClass: 'h-40', 
			thumbnail: ApiImg + "/" + tour.featured_image,
		});
		for (let value in tour.image) {
			//push to image array
			imagesGallery.push({
				original: ApiImg + "/" + tour.image[value].file_name,
				// originalClass: 'h-40', 
				thumbnail: ApiImg + "/" + tour.image[value].file_name,
			});
		}
	};
	// END IMAGE GALLERY ============================================
	//hook
	useEffect(() => {
		//call function "placeImage"
		tourImages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	});
	return (
		<React.Fragment>
			<LayoutWeb>
				{loading && <SkeletonDetail />}
				{
					<div hidden={hide}>
						<section className="px-6 md:px-64 flex flex-row items-center justify-between mt-10">
							<div className="flex flex-col gap-y-2">
								<div className="flex flex-row items-center">
									<h5 className="text-xl md:text-3xl my-2 font-medium text-gray-500">
										{tour.title}
									</h5>
									{parseInt(tour.premium) === 1 && (
										<span className="ml-2 p-1 w-auto h-6 rounded-lg gap-x-1 bg-amber-500">
											<p className="text-white text-xs">PREMIUM</p>
										</span>
									)}
									{parseInt(tour.featured) === 1 && (
										<span className="ml-2 p-1 w-auto h-6 rounded-lg gap-x-1 bg-blue-500">
											<p className="text-white text-xs">UNGGULAN</p>
										</span>
									)}
								</div>
								{/* spacer */}
								<div
									className={
										parseInt(tour.premium) === 1 && notLoggedIn
											? "blur"
											: !notLoggedIn && notYetPaid
											? "blur"
											: ""
									}
								>
									<div className="flex gap-x-1 md:gap-x-2 items-center">
										<section className="flex items-center p-2 rounded-lg w-18 gap-x-1 bg-amber-500">
											<p className="text-white text-sm">{tour.rating}</p>
											<AiTwotoneStar className="text-white w-3 h-3" />
										</section>
										<p className="text-sm text-gray-500">{tour.address}</p>
									</div>
								</div>
								{/* spacer */}
							</div>
							{/* Favorite */}
							<section className="flex gap-x-1 items-center">
								{token ? (
									<div>
										{favorite === false ? (
											<div>
												<button
													className="px-2 py-2 bg-gray-300 rounded-lg"
													onClick={() => createFavorite(tour.id)}
												>
													<AiOutlineHeart />
												</button>
											</div>
										) : (
											<div>
												<button
													className="px-2 py-2 bg-gray-300 rounded-lg"
													onClick={() => removeFavorite(tour.id)}
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
										url: LinkUrl + "/wisata/" + tour.slug,
										title: `${tour.title}`,
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
							<div className="w-full px-6 md:w-[50rem] mt-4">
								<ImageGallery items={imagesGallery} autoPlay={true} />
							</div>
						</div>
						<hr className="w-2/3 mx-auto" />

						{/*Deskripsi*/}
						<section className="px-6 md:px-64 my-8">
							<h1 className="font-semibold text-lg mb-2 text-gray-500">Deskripsi</h1>
							<div dangerouslySetInnerHTML={{ __html: tour["content"] }}></div>
						</section>
						<hr className="w-2/3 mx-auto" />

						{/*Details*/}
						<div
							className={
								parseInt(tour.premium) === 1 && notLoggedIn
									? "blur"
									: !notLoggedIn && notYetPaid
									? "blur"
									: ""
							}
						>
							<section className="px-6 md:px-64 flex flex-col-reverse md:flex-row justify-between items-start my-10">
								<div className="flex flex-col space-y-3 items-start">
									<h1 className="font-semibold text-lg text-gray-500">Detail</h1>
									<p className="flex flex-row gap-x-2 items-center text-sm text-gray-500">
										<BsTelephone />
										{tour.phone_number != null ? tour.phone_number : "-"}
									</p>
									<p className="flex flex-row gap-x-2 items-center text-sm text-gray-500">
										<BsGlobe />
										{tour.website != null ? tour.website : "-"}
									</p>
									<p className="flex flex-row gap-x-2 items-center text-sm text-gray-500">
										<BsFacebook />
										{tour.facebook != null ? tour.facebook : "-"}
									</p>
									<p className="flex flex-row gap-x-2 items-center text-sm text-gray-500">
										<BsInstagram />
										{tour.instagram != null ? tour.instagram : "-"}
									</p>
									<p className="flex flex-row gap-x-2 items-center text-sm text-gray-500">
										<BsInfoCircle />
										{tour.address}
									</p>
									<p className="flex flex-row gap-x-2 items-center text-sm text-gray-500">
										<BsClock />
										{tour.operational_hour}
									</p>
								</div>

								<div className="w-full md:w-1/2">
									<h1 className="font-semibold text-lg mb-4 text-gray-500">Harga</h1>
									<div className="shadow-xl w-full md:w-1/2 bg-amber-300 rounded-xl p-5 mb-4">
										<div className="mb-2">
											<p className="text-center font-medium">Rp {tour.price}</p>
										</div>
									</div>
								</div>
							</section>
						</div>
						<hr className="w-2/3 mx-auto" />

						{/*Fasilitas*/}
						<div
							className={
								parseInt(tour.premium) === 1 && notLoggedIn
									? "blur"
									: !notLoggedIn && notYetPaid
									? "blur"
									: ""
							}
						>
							<section className="px-6 md:px-64 my-8">
								<h1 className="font-semibold text-lg mb-2 text-gray-500">Fasilitas</h1>
								<div className="inline-flex space-x-10 text-gray-500">
									<ul className="flex flex-col">
										{tour.tour_attribute?.length > 0 ? (
											tour.tour_attribute.map((facilities) => (
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
								parseInt(tour.premium) === 1 && notLoggedIn
									? "blur"
									: !notLoggedIn && notYetPaid
									? "blur"
									: ""
							}
						>
							<section className="px-6 md:px-64 my-[60px]">
								<h1 className="font-semibold text-lg my-5 text-gray-500">Detail Lokasi</h1>
								<div className="mx-auto md:w-[800px] md:h-[600px] w-[90vw] h-[50vh]">
									<iframe
										title="tour map"
										className="md:w-[800px] md:h-[600px] w-[90vw] h-[50vh]"
										src={tour.url_map}
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
										parseInt(tour.premium) === 1 && notLoggedIn
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
												tour_id={tour.id}
												review={reviewUser.review}
												rating={reviewUser.rating}
												username={userName}
												createdAt={reviewUser.created_at}
												fetchDataTour={fetchDataTour}
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
													onClick={() => removeReview(tour.id)}
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
								parseInt(tour.premium) === 1 && notLoggedIn
									? "blur"
									: !notLoggedIn && notYetPaid
									? "blur"
									: ""
							}
						>
							<section className="px-6 md:px-64 my-8">
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

						{/*Rekomendasi*/}
						<section className="px-6 md:px-[15.25rem] my-8">
							<h1 className="font-semibold text-lg my-5 text-gray-500">Rekomendasi Lain</h1>
							<div className="flex flex-col md:flex-row md:gap-x-2 overflow-hidden">
								{loading && <SkeletonRecommendation />}
								{tourRecommend.length > 0 ? (
									tourRecommend
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
