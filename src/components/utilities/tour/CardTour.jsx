import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { MdStars } from "react-icons/md";
import { HiCurrencyDollar } from "react-icons/hi";
import { ApiImg } from "../../../api/index";

function CardTour(props) {
	return (
		<div className="flex flex-col h-auto gap-x-4">
			<div
				className="w-52 border-gray-200 p-2 transform duration-150 ease-in"
				key={props.id}
			>
				<Link
					to={`/wisata/${props.slug}`}
					className="text-decoration-none text-black"
				>
					<img
						className="w-52 h-52 rounded-lg"
						src={ApiImg + "/" + props.featured_image}
						alt=""
					/>
					{props.premium === 0 && props.featured === 1 ? (
						<div className="absolute right-[15px] top-[1rem] bg-blue-500 px-1 py-[4px] rounded-md text-white text-xs">
							<MdStars className="text-[20px]" title="Unggulan"/>
						</div>
					) : props.premium === 1 && props.featured === 0 ? (
						<div className="absolute right-[15px] top-[1rem] bg-amber-500 px-1 py-[4px] rounded-md text-white text-xs">
							<HiCurrencyDollar className="text-[20px]" title="Premium"/>
						</div>
					) : props.premium === 1 && props.featured === 1 ? (
						<div>
							<div className="absolute right-[15px] top-[1rem] bg-amber-500 px-1 py-[4px] rounded-md text-white text-xs">
								<HiCurrencyDollar className="text-[20px]" title="Premium"/>
							</div>
							<div className="absolute right-[15px] top-[3rem] bg-blue-600 px-1 py-[4px] rounded-md text-white text-xs">
								<MdStars className="text-[20px]" title="Unggulan"/>
							</div>
						</div>
					) : (
						<div></div>
					)}
					<div className="flex mt-2 items-start flex-col truncate">
						<h5 className="text-base font-bold text-left truncate text-gray-500">
							{props.title.length > 20
								? `${props.title.substring(0, 20)}...`
								: props.title}
						</h5>
						<p className="text-sm mt-1 text-[#888888]">{props.city}</p>
					</div>
					<div className="flex items-center gap-x-3">
						<div className="flex items-center gap-x-1">
							<p className="text-xs text-gray-500 mb-0">{props.rating}</p>
							<div className="flex items-center gap-x-0">
								<AiFillStar className="text-yellow-400" />
							</div>
						</div>
						<p className="text-xs text-gray-500 ml-auto">
							({props.review_count} ulasan)
						</p>
					</div>
				</Link>
			</div>
		</div>
	);
}
export default CardTour;
