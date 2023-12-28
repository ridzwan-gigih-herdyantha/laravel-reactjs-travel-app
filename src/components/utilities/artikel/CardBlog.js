import { Link } from "react-router-dom";
import { ApiImg } from "../../../api";

function CardBlog(props) {
	return (
		<div>
			<div
				className="w-56 border-gray-200 p-2 mb-3 transform duration-150 ease-in"
				key={props.id}
			>
				<Link
					to={`/blog/${props.slug}`}
					className="text-decoration-none text-black"
				>
					<img
						className="h-52 rounded-lg"
						src={ApiImg + "/" + props.feature_image}
						alt=""
					/>
					{parseInt(props.feature) === 1 && (
						<div className="absolute left-[8px] top-[8px] bg-blue-600 px-2 py-[4px] rounded-lg text-white font-semibold text-xs">
							Unggulan
						</div>
					)}
					<div className="flex mt-2 items-start flex-col truncate">
						<h5 className="text-base font-bold text-left truncate text-gray-500">
							{props.title.length > 20
								? `${props.title.substring(0, 20)}...`
								: props.title}
						</h5>
						<p className="text-sm mt-1 text-[#888888]">{props.name}</p>
					</div>
					<p className="text-sm text-gray-500 ml-auto">{props.type}</p>
					<div className="flex mt-1 items-center gap-x-3">
						<div className="flex items-center gap-x-1">
							<p className="text-xs text-gray-500 ml-auto">{props.user}</p>
						</div>
						<p className="text-xs text-gray-500 ml-auto">
							({props.commentCount} komentar)
						</p>
					</div>
				</Link>
			</div>
		</div>
	);
}
export default CardBlog;
