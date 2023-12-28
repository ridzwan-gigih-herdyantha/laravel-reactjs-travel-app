import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Dashboard";
import { Api } from "../../../api/index";
import CardFavorite from "../../../components/utilities/my-favorite/CardFavorite";
import { SkeletonMyFavorite } from "../../../components/utilities/skeleton";
import Cookies from "js-cookie";

function Favorite() {
	//title page
	document.title = "Traveling | My Favorite";

	//state tours
	const token = Cookies.get("token");
	const [myFavorite, setMyFavorite] = useState([]);
	const [loading, setLoading] = useState(true);

	//function "fetchDataMyFavorite"
	const fetchDataMyFavorite = async () => {
		await Api.get(`/favorite`, {
			headers: {
				//header Bearer + Token
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				setLoading(true);
				setMyFavorite(response.data.data);
			})
			.catch((error) => {
				setMyFavorite(0);
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
		fetchDataMyFavorite();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<React.Fragment>
			<LayoutAdmin>
					<section className="grid grid-cols-2 lg:grid-cols-4 gap-2">
						{loading && <SkeletonMyFavorite />}
						{myFavorite ? (
							myFavorite.map((favorite) => (
								<CardFavorite
									key={favorite.item.tour.id}
									id={favorite.item.tour.id}
									slug={favorite.item.tour.slug}
									title={favorite.item.tour.title}
									featured_image={favorite.item.tour.featured_image}
									featured={favorite.item.tour.featured}
									premium={favorite.item.tour.premium}
									city={favorite.item.tour.city.name}
									type={favorite.type_tour}
									rating={favorite.item.tour.rating}
									review_count={favorite.item.tour.review_count}
								/>
							))
						) : (
							<div>
								<p>Data Belum Tersedia.</p>
							</div>
						)}
					</section>
			</LayoutAdmin>
		</React.Fragment>
	);
}

export default Favorite;
