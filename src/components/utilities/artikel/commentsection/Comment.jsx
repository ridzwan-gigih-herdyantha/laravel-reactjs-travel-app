import React from "react";
import { ProfilePic } from "../../../../assets";
import moment from "moment";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { Api } from "../../../../api/index";

function Comment({ comment, fetchDataBlog }) {
	const token = Cookies.get("token");
	const userId = parseInt(Cookies.get("user_id"));
	const removeComment = async (e) => {
		await Api.post(
			"/delete-blog",
			{
				comment_id: e,
			},
			{
				headers: {
					//header Bearer + Token
					Authorization: `Bearer ${token}`,
				},
			}
		).then((response) => {
			toast.success("Comment has been Removed!", {
				duration: 4000,
				position: "top-right",
				className: "toast",
				style: {
					background: "#333",
					color: "#fff",
				},
			});
			setTimeout(function () {
				window.location.reload(1);
			}, 2000);
		});
	};
	return (
		<div className="rounded-xl w-full pb-[0.5px] pt-[5px] mb-3 bg-gray-100">
			<div className="inline-flex items-center ml-4 mt-1 mr-2">
				<img
					alt=""
					src={ProfilePic}
					height={32}
					width={32}
					className="rounded-full"
				/>
				<div className="flex-col">
					<p className="font-semibold text-md ml-1 text-gray-500">{comment.user.name}</p>
					<p className="ml-1 text-xs text-gray-500">{moment(comment.created_at).fromNow()}</p>
				</div>
			</div>
			{(comment.user.id === userId) && (
				<button className="float-right mr-3" onClick={() => removeComment(comment.id)}>Delete</button>
			)}
			<p className="ml-5 mt-2 mb-4 text-gray-500">{comment.comment}</p>
		</div>
	);
}

export default Comment;
