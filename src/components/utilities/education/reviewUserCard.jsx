import React from "react";
import { ProfilePic } from "../../../assets/index";
import ReactStars from "react-rating-stars-component";
import moment from "moment";

function ReviewUserCard(props) {
	return (
		<div className="flex flex-col p-6 w-auto gap-x-8 rounded-lg border">
			{/*Profile Pic*/}
			<div className="inline-flex items-center gap-x-1">
				<img
					alt="user-profile"
					src={ProfilePic}
					className="rounded-lg w-12 h-12"
				/>
				{/*Name*/}
				<section className="ml-2">
					<p className="font-bold text-gray-500">{props.username}</p>
					<p className="text-gray-600 text-xs">
						{moment(props.createdAt).fromNow()}
					</p>
				</section>
			</div>
			{/*Review Stars*/}
			<ReactStars
				classNames="mt-2 disable"
				count={props.rating}
				size={15}
				color="#ffd700"
				disabled={true}
			/>
			<p className="font-normal text-sm mt-2">{props.review}</p>
		</div>
	);
}

export default ReviewUserCard;
