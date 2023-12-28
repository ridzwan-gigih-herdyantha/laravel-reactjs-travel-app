import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/Web";
import { Link } from "react-router-dom";
import { Api } from "../../../api/index";
import CardBlog from "../../../components/utilities/artikel/CardBlog";
import PaginationComponent from "../../../components/utilities/Pagination";
import { SkeletonBlog } from "../../../components/utilities/skeleton";

function Blog() {
	//title page
	document.title = "Traveling | Blog";

	//states
	const [blogs, setBlogs] = useState([]);
	const [Loading, setLoading] = useState(true);
	const [hideNullData, setHideNullData] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(0);
	const [total, setTotal] = useState(0);

	const fetchDataBlogs = async (pageNumber) => {
		//define page variable
		const page = pageNumber ? pageNumber : currentPage;
		setPerPage(page);
		await Api.get(`/blog/list?page=${page}`).then((response) => {
			setLoading(true)
			setHideNullData(true);
			setBlogs(response.data.data.data);
			setCurrentPage(response.data.data.current_page);
			setPerPage(response.data.data.per_page);
			setTotal(response.data.data.total);
			scrollToTop();
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
		fetchDataBlogs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<React.Fragment>
			<LayoutWeb>
				<div className="bg-gray-50 w-full h-64 my-8 md:h-16 px-12 md:px-24 space-y-5">
					<section className="pt-5 text-center md:text-left">
						<p className="text-sm text-gray-500">
							<Link to="/" className="text-black">
								Home
							</Link>{" "}
							/ Blog
						</p>
					</section>
				</div>
				<div className="mt-2">
					<div className="ml-24">
						<h5 className="text-xl font-semibold text-gray-500">
							Temukan Artikel / Blog
						</h5>
					</div>
					<div className="flex justify-between px-12 md:flex-row flex-col">
						<section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-[16px] gap-y-2 ml-12 my-12">
							{Loading && <SkeletonBlog/>}
							{blogs ? (
								blogs.map((blog) => (
									<CardBlog
										key={blog.id}
										id={blog.id}
										slug={blog.slug}
										title={blog.title}
										feature_image={blog.feature_image}
										feature={blog.feature}
										type={blog.category_blog.name}
										user={blog.user.name}
										commentCount={blog.comment_count}
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
						{blogs ? (
							<PaginationComponent
								currentPage={currentPage}
								perPage={perPage}
								total={total}
								onChange={(pageNumber) =>
									fetchDataBlogs(pageNumber)
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

export default Blog;
