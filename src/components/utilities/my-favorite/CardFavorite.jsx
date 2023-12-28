import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { ApiImg } from "../../../api/index";

function CardFavorite(props) {
	return (
		<div>
			<div
				className="rounded-lg border-2 w-48 border-gray-200 p-2 hover:shadow-xl hover:border-transparent transform duration-150 ease-in"
				key={props.id}
			>
				<Link
					to={`/${props.type}/${props.slug}`}
					className="text-decoration-none text-black"
				>
					<img
						className="w-48 h-48 rounded-lg"
						src={ApiImg + "/" + props.featured_image}
						alt=""
					/>
					{parseInt(props.premium) === 1 && (
						<div className="absolute left-[8px] bottom-[6rem] bg-amber-500 px-2 py-[4px] text-white text-xs">
							PREMIUM
						</div>
					)}
					{parseInt(props.featured) === 1 && (
						<div className="absolute right-[8px] top-[8px] bg-blue-800 px-2 py-[4px] rounded-md text-white text-xs">
							UNGGULAN
						</div>
					)}
					<div className="flex mt-2 items-start flex-col truncate">
						<h5 className="text-base font-bold text-left truncate">
							{props.title.length > 20
								? `${props.title.substring(0, 20)}...`
								: props.title}
						</h5>
						<p className="text-sm mt-1 text-[#888888]">{props.city}</p>
					</div>
				</Link>
				<div className="flex mt-1 items-center gap-x-3">
					<div className="flex items-center gap-x-1">
						<p className="text-sm text-gray-500 mb-0">{props.rating}</p>
						<div className="flex items-center gap-x-0">
							<AiFillStar className="text-yellow-400" />
						</div>
					</div>
					<p className="text-xs text-gray-500 ml-auto">
						({props.review_count} review)
					</p>
				</div>
			</div>
		</div>
	);
}

export default CardFavorite;
