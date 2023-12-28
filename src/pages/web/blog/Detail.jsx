import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutWeb from "../../../layouts/Web";
import { Link } from "react-router-dom";
import { Api, ApiImg, LinkUrl } from "../../../api/index";
import Cookies from "js-cookie";

import { FiShare2 } from "react-icons/fi";
import { RWebShare } from "react-web-share";
import { toast } from "react-hot-toast";

import { ProfilePic } from "../../../assets";
import Comments from "../../../components/utilities/artikel/commentsection/Comments";
import { SkeletonBlogDetail } from "../../../components/utilities/skeleton";

function BlogDetail() {
	const token = Cookies.get("token");
	const [blog, setBlog] = useState({});
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);
	const [hideNullData, setHideNullData] = useState(true);
	const [comment, setComment] = useState("");
	const [seoTitle, setSeoTitle] = useState("");
	const [title, setTitle] = useState("");
	const [commentlist, setCommentsList] = useState([]);
	const { slug } = useParams();
	//state validation
	const [validation, setValidation] = useState({});

	if (seoTitle !== null) {
		document.title = `${seoTitle} | Traveling`;
	} else {
		document.title = `${title} | Traveling`;
	}

	const fetchDataBlog = async () => {
		await Api.get(`blog/${slug}`)
			.then((response) => {
				setLoading(true);
				setHideNullData(true);
				setBlog(response.data.data);
				setUser(response.data.data.user);
				setCommentsList(response.data.comments);
				setSeoTitle(response.data.data.seo_title);
				setTitle(response.data.data.title);
			})
			.finally(() => {
				setLoading(false);
				setHideNullData(false);
			});
	};

	const PostComment = async (e) => {
		setLoading(true);
		e.preventDefault();
		await Api.post(
			"/blog",
			{
				blog_id: blog.id,
				comment: comment,
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
					"Comment Posted!",
					{
						duration: 4000,
						position: "top-right",
						className: "toast",
						style: {
							background: "#333",
							color: "#fff",
						},
					},
					fetchDataBlog(),
					setComment(""),
					setLoading(false)
				);
				setTimeout(function () {
					window.location.reload(1);
				}, 2000);
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
		fetchDataBlog();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<LayoutWeb>
			{loading && <SkeletonBlogDetail />}
			{
				<div hidden={hideNullData}>
					<section className="mt-16 mb-4 inline-flex items-center gap-x-[40vw] mx-[24vw]">
						<div className="inline-flex items-center">
							<img
								alt="profile pic"
								height={50}
								width={50}
								src={ProfilePic}
								className="rounded-full"
							/>
							<p className="font-semibold ml-2 text-md text-gray-500">{user.name}</p>
						</div>
						<div>
							<RWebShare
								data={{
									text: "test",
									url: LinkUrl + "/blog/" + `${blog.slug}`,
									title: `${blog.title}`,
									sites: [],
								}}
								onClick={() => console.log("success!")}
							>
								<button className="px-2 py-2 bg-gray-300 rounded-lg">
									<FiShare2 />
								</button>
							</RWebShare>
						</div>
					</section>

					<section>
						<h1 className="gap-x-[40vw] mx-[24vw] mt-8 text-gray-500">{blog.title}</h1>
						{/* <img
					alt=""
					src={ApiImg + "/" + blog.feature_image}
					className="mx-auto my-6"
				/> */}
						<div
							className="w-[51vw] mx-[24vw]"
							dangerouslySetInnerHTML={{ __html: blog["content"] }}
						></div>
					</section>
					<hr className="my-10 w-[60vw] mx-[20vw]" />

					<section className="mx-[25vw]">
						<div className="inline-flex items-center mb-1">
							<h3 className="text-lg font-semibold text-gray-500">Kirim Komentar</h3>
						</div>
						<form className="mb-20" onSubmit={PostComment}>
							<textarea
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								type="text"
								placeholder="Masukkan komentarmu disini"
								className="w-full pt-1 h-20 border rounded-xl border-black outline-none px-4"
							></textarea>
							{validation.comment && (
								<div className="text-red-500">
									{validation.comment[0]}
								</div>
							)}
							{token ? (
								<div>
									<button className="float-right mt-2 bg-black rounded-lg text-white font-bold px-3 py-2">
										{loading ? "Loading..." : "kirim"}
									</button>
								</div>
							) : (
								<div>
									<Link
										to={"/login"}
										className="float-right mt-2 bg-black rounded-lg text-white font-bold px-3 py-2"
									>
										kirim
									</Link>
								</div>
							)}
						</form>
					</section>

					<section className="mx-[25vw]">
						<div className="inline-flex items-center mb-1">
							<h3 className="text-lg font-semibold text-gray-500">Komentar</h3>
							<p className="text-sm ml-1 text-gray-600">
								( {commentlist.length} )
							</p>
						</div>
						{commentlist.length > 0 ? (
							<Comments comments={commentlist} fetchDataBlog={fetchDataBlog} />
						) : (
							<div hidden={hideNullData}>
								<p>Belum ada komentar.</p>
							</div>
						)}
					</section>
				</div>
			}
		</LayoutWeb>
	);
}

export default BlogDetail;
