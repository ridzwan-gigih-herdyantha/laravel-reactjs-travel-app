import React from "react";
import Comment from "./Comment";
// import CommentForm from "./CommentForm";

function Comments({ comments, fetchDataBlog }) {
	return (
		<div>
			{comments.map((comment) => (
				<Comment key={comment.id} comment={comment} fetchDataBlog={fetchDataBlog} />
			))}
			{/* <CommentForm /> */}
		</div>
	);
}

export default Comments;
